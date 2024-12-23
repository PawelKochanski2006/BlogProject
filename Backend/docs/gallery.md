# Dokumentacja API Galerii

## Przegląd

API do zarządzania galerią zdjęć na blogu, umożliwiające przesyłanie zdjęć, organizowanie ich w kategorie oraz zarządzanie metadanymi. System wspiera różne formaty plików, kategoryzację oraz różne poziomy dostępu (admin/user).

## Główne funkcjonalności

- Zarządzanie zdjęciami (dodawanie, edycja, usuwanie)
- Organizacja zdjęć w kategorie
- Obsługa metadanych (alt text, opisy)
- Role i uprawnienia (admin/user)
- Walidacja i optymalizacja plików

## Szczegółowa dokumentacja

### Pobierz wszystkie kategorie

- **URL**: `/api/gallery/categories`
- **Metoda**: `GET`
- **Odpowiedź sukcesu**:

  ```json
  [
    {
      "id": "number",
      "name": "string",
      "created_at": "string"
    }
  ]
  ```

- **Kody odpowiedzi**:
  - `200`: Kategorie pobrane pomyślnie
  - `500`: Błąd serwera

### Pobierz wszystkie zdjęcia

- **URL**: `/api/gallery`
- **Metoda**: `GET`
- **Odpowiedź sukcesu**:

  ```json
  [
    {
      "image_id": "number",
      "image_url": "string",
      "alt_text": "string",
      "category": "string",
      "uploaded_by": "string",
      "created_at": "string"
    }
  ]
  ```

- **Kody odpowiedzi**:
  - `200`: Zdjęcia pobrane pomyślnie
  - `500`: Błąd serwera

### Pobierz zdjęcia z kategorii

- **URL**: `/api/gallery/category/:category`
- **Metoda**: `GET`
- **Parametry URL**:
  - `category`: ID kategorii
- **Odpowiedź sukcesu**:

  ```json
  [
    {
      "id": "number",
      "image_url": "string",
      "alt_text": "string",
      "category_name": "string",
      "author_name": "string",
      "created_at": "string"
    }
  ]
  ```

- **Kody odpowiedzi**:
  - `200`: Zdjęcia pobrane pomyślnie
  - `404`: Kategoria nie znaleziona
  - `500`: Błąd serwera

### Dodaj zdjęcie

- **URL**: `/api/gallery`
- **Metoda**: `POST`
- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `multipart/form-data`
- **Body** (multipart/form-data):
  - `image`: File (max 5MB, formaty: jpeg, jpg, png, gif)
  - `alt_text`: string
  - `category_id`: number
  - `user_id`: number
- **Odpowiedź sukcesu**:

  ```json
  {
    "id": "number",
    "user_id": "number",
    "image_url": "string",
    "alt_text": "string",
    "category_id": "number"
  }
  ```

- **Kody odpowiedzi**:
  - `201`: Zdjęcie dodane
  - `400`: Nieprawidłowe dane lub format pliku
  - `401`: Brak autoryzacji
  - `413`: Plik zbyt duży
  - `500`: Błąd serwera

### Aktualizuj szczegóły zdjęcia (Admin)

- **URL**: `/api/gallery/:image_id`
- **Metoda**: `PUT`
- **Headers**:
  - `Authorization`: `Bearer {token}`
- **Parametry URL**:
  - `image_id`: ID zdjęcia do aktualizacji
- **Body**:

  ```json
  {
    "image_url": "string",
    "alt_text": "string",
    "category_id": "number"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Zdjęcie zaktualizowane"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Zdjęcie zaktualizowane
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `404`: Zdjęcie nie znalezione
  - `500`: Błąd serwera

### Usuń zdjęcie (Admin)

- **URL**: `/api/gallery/:image_id`
- **Metoda**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer {token}`
- **Parametry URL**:
  - `image_id`: ID zdjęcia do usunięcia
- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "Zdjęcie usunięte"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Zdjęcie usunięte
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `404`: Zdjęcie nie znalezione
  - `500`: Błąd serwera

### Utwórz nową kategorię (Admin)

- **URL**: `/api/gallery/category`
- **Metoda**: `POST`
- **Headers**:
  - `Authorization`: `Bearer {token}`
- **Body**:

  ```json
  {
    "categoryName": "string"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "id": "number",
    "name": "string",
    "created_at": "string"
  }
  ```

- **Kody odpowiedzi**:
  - `201`: Kategoria utworzona
  - `400`: Nieprawidłowe dane
  - `401`: Brak autoryzacji
  - `403`: Brak uprawnień
  - `409`: Kategoria już istnieje
  - `500`: Błąd serwera

## Uwagi implementacyjne

1. Obsługa plików:

   - Maksymalny rozmiar pliku: 5MB
   - Dozwolone formaty: jpeg, jpg, png, gif
   - Automatyczna kompresja dużych obrazów
   - Generowanie miniatur dla optymalizacji

2. Uprawnienia:

   - Przeglądanie galerii: dostępne dla wszystkich
   - Dodawanie zdjęć: zalogowani użytkownicy
   - Zarządzanie kategoriami: tylko admin
   - Usuwanie/edycja zdjęć: autor lub admin

3. Walidacja:

   - Sprawdzanie formatu i rozmiaru plików
   - Weryfikacja poprawności kategorii
   - Walidacja metadanych (alt_text, opisy)
   - Sprawdzanie unikalności nazw kategorii

4. Przechowywanie:
   - Pliki zapisywane w strukturze katalogów według daty
   - Backup zdjęć na zewnętrznym storage
   - Czyszczenie nieużywanych plików
   - Optymalizacja przestrzeni dyskowej
