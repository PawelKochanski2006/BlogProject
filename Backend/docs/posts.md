# Dokumentacja API Postów

## Przegląd

API do zarządzania postami na blogu, umożliwiające wykonywanie operacji CRUD na postach, zarządzanie polubieniami oraz śledzenie wyświetleń. System wspiera paginację wyników oraz różne poziomy dostępu (admin/user).

## Główne funkcjonalności

- Zarządzanie postami (dodawanie, edycja, usuwanie)
- System polubień postów
- Licznik wyświetleń postów
- Paginacja wyników
- Role i uprawnienia (admin/user)

## Szczegółowa dokumentacja

### Pobierz wszystkie posty

- **URL**: `/api/posts`
- **Metoda**: `GET`
- **Query Params**:
  - `page`: numer strony (domyślnie: 1)
  - `limit`: liczba postów na stronę (domyślnie: 10)
- **Odpowiedź sukcesu**:

  ```json
  {
    "posts": [
      {
        "post_id": "number",
        "title": "string",
        "description": "string",
        "thumbnail": "string",
        "read_time": "string",
        "views": "number",
        "likes_count": "number",
        "comments_count": "number",
        "category": "string",
        "author": "string",
        "created_at": "string"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalPosts": "number",
      "postsPerPage": "number"
    }
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Posty pobrane pomyślnie
  - `500`: Błąd serwera

### Pobierz post po ID

- **URL**: `/api/posts/:id`
- **Metoda**: `GET`
- **Parametry URL**:
  - `id`: ID posta do pobrania
- **Odpowiedź sukcesu**:

  ```json
  {
    "post_id": "number",
    "title": "string",
    "description": "string",
    "read_time": "string",
    "views": "number",
    "likes_count": "number",
    "comments_count": "number",
    "main_image": "string",
    "category": "string",
    "author": "string",
    "tags": "string",
    "additional_images": "string",
    "created_at": "string"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Post pobrany pomyślnie
  - `404`: Post nie znaleziony
  - `500`: Błąd serwera

### Dodaj nowy post (Admin)

- **URL**: `/api/posts`
- **Metoda**: `POST`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Body**:

  ```json
  {
    "title": "string",
    "description": "string",
    "categoryId": "number",
    "imageUrl": "string",
    "altText": "string",
    "readTime": "string"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Post added",
    "postId": "number"
  }
  ```

- **Kody odpowiedzi**:
  - `201`: Post utworzony
  - `400`: Nieprawidłowe dane
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `500`: Błąd serwera

### Edytuj post (Admin)

- **URL**: `/api/posts/:postId`
- **Metoda**: `PUT`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Parametry URL**:
  - `postId`: ID posta do edycji
- **Body**:

  ```json
  {
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "additionalImages": ["string"]
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Post updated"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Post zaktualizowany
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `404`: Post nie znaleziony
  - `500`: Błąd serwera

### Usuń post (Admin)

- **URL**: `/api/posts/:postId`
- **Metoda**: `DELETE`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Parametry URL**:
  - `postId`: ID posta do usunięcia
- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Post deleted"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Post usunięty
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `404`: Post nie znaleziony
  - `500`: Błąd serwera

### Zarządzanie polubieniami

#### Dodaj polubienie
- **URL**: `/api/posts/:postId/like`
- **Metoda**: `POST`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Polubienie dodane",
    "result": {}
  }
  ```

#### Usuń polubienie
- **URL**: `/api/posts/:postId/like`
- **Metoda**: `DELETE`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Polubienie usunięte",
    "result": {}
  }
  ```

#### Sprawdź status polubienia
- **URL**: `/api/posts/:postId/like/status`
- **Metoda**: `GET`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Odpowiedź sukcesu**:

  ```json
  {
    "isLiked": "boolean"
  }
  ```

## Uwagi implementacyjne

1. Paginacja:
   - Domyślnie 10 postów na stronę
   - Możliwość konfiguracji przez parametry `page` i `limit`
   - Zwracane informacje o całkowitej liczbie stron i postów

2. Uprawnienia:
   - Przeglądanie postów: dostępne dla wszystkich
   - Dodawanie/edycja/usuwanie: tylko dla adminów
   - Polubienia: tylko dla zalogowanych użytkowników

3. Walidacja:
   - Tytuł: wymagany, 3-100 znaków
   - Opis: wymagany, minimum 10 znaków
   - Kategoria: musi istnieć w systemie
   - URL obrazów: poprawny format URL

4. Optymalizacja:
   - Cachowanie popularnych postów
   - Indeksowanie pól używanych do sortowania i filtrowania
   - Lazy loading dla dodatkowych obrazów
