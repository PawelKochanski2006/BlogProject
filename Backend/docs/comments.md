# Dokumentacja API Komentarzy

## Przegląd

API do zarządzania komentarzami na blogu, umożliwiające dodawanie, edycję i usuwanie komentarzy oraz odpowiedzi na komentarze. System wspiera hierarchiczną strukturę komentarzy (komentarze główne i odpowiedzi) oraz różne poziomy dostępu (admin/user).

## Główne funkcjonalności

- Zarządzanie komentarzami (dodawanie, edycja, usuwanie)
- System odpowiedzi na komentarze
- Hierarchiczna struktura komentarzy
- Role i uprawnienia (admin/user)

## Szczegółowa dokumentacja

### Pobierz komentarze dla posta

- **URL**: `/api/comments/:postId`
- **Metoda**: `GET`
- **Parametry URL**:
  - `postId`: ID posta, dla którego pobierane są komentarze
- **Odpowiedź sukcesu**:

  ```json
  [
    {
      "comment_id": "number",
      "comment_content": "string",
      "parent_comment_id": "number|null",
      "author": "string",
      "created_at": "string"
    }
  ]
  ```

- **Kody odpowiedzi**:
  - `200`: Komentarze pobrane pomyślnie
  - `404`: Post nie znaleziony
  - `500`: Błąd serwera

### Dodaj komentarz

- **URL**: `/api/comments`
- **Metoda**: `POST`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Body**:

  ```json
  {
    "postId": "number",
    "userId": "number",
    "content": "string",
    "parentCommentId": "number|null"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Komentarz dodany pomyślnie",
    "commentId": "number",
    "data": {
      "postId": "number",
      "userId": "number",
      "content": "string",
      "parentCommentId": "number|null"
    }
  }
  ```

- **Kody odpowiedzi**:
  - `201`: Komentarz dodany
  - `400`: Nieprawidłowe dane
  - `401`: Brak autoryzacji
  - `404`: Post nie znaleziony
  - `500`: Błąd serwera

### Edytuj komentarz

- **URL**: `/api/comments/:id`
- **Metoda**: `PUT`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Parametry URL**:
  - `id`: ID komentarza do edycji
- **Body**:

  ```json
  {
    "content": "string"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Komentarz zaktualizowany"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Komentarz zaktualizowany
  - `400`: Nieprawidłowe dane
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `404`: Komentarz nie znaleziony
  - `500`: Błąd serwera

### Usuń komentarz (Admin)

- **URL**: `/api/comments/:id`
- **Metoda**: `DELETE`
- **Headers**: 
  - `Authorization`: `Bearer {token}`
- **Parametry URL**:
  - `id`: ID komentarza do usunięcia
- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Komentarz usunięty"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Komentarz usunięty
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `404`: Komentarz nie znaleziony
  - `500`: Błąd serwera

## Uwagi implementacyjne

1. Hierarchia komentarzy:
   - Komentarze główne mają `parent_comment_id: null`
   - Odpowiedzi na komentarze mają ustawione `parent_comment_id` na ID komentarza nadrzędnego
   - System wspiera nieograniczoną głębokość odpowiedzi

2. Uprawnienia:
   - Dodawanie komentarzy: zalogowani użytkownicy
   - Edycja komentarzy: autor komentarza lub admin
   - Usuwanie komentarzy: autor komentarza lub admin

3. Walidacja:
   - Treść komentarza nie może być pusta
   - Maksymalna długość komentarza: 1000 znaków
   - Sprawdzanie istnienia posta przed dodaniem komentarza
   - Sprawdzanie istnienia komentarza nadrzędnego przy dodawaniu odpowiedzi

