# Dokumentacja API Autentykacji

## Przegląd

API do zarządzania autentykacją użytkowników, umożliwiające rejestrację nowych użytkowników, logowanie oraz zarządzanie sesją. System wspiera różne role użytkowników (admin/user) oraz wykorzystuje tokeny JWT do autoryzacji.

## Główne funkcjonalności

- Rejestracja nowych użytkowników
- Logowanie użytkowników
- Zarządzanie sesją użytkownika
- System ról i uprawnień (admin/user)
- Autoryzacja przez tokeny JWT

## Szczegółowa dokumentacja

### Rejestracja użytkownika

- **URL**: `/api/auth/register`
- **Metoda**: `POST`
- **Body**:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "message": "User registered",
    "userId": "number"
  }
  ```

- **Kody odpowiedzi**:
  - `201`: Użytkownik został zarejestrowany
  - `400`: Nieprawidłowe dane
  - `409`: Nazwa użytkownika lub email już istnieje
  - `500`: Błąd serwera

### Logowanie użytkownika

- **URL**: `/api/auth/login`
- **Metoda**: `POST`
- **Body**:

  ```json
  {
    "usernameOrEmail": "string",
    "password": "string"
  }
  ```

- **Odpowiedź sukcesu**:

  ```json
  {
    "token": "string",
    "user": {
      "id": "number",
      "username": "string",
      "email": "string",
      "role": {
        "id": "number",
        "name": "string",
        "description": "string"
      },
      "created_at": "string"
    }
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Zalogowano pomyślnie
  - `400`: Brak wymaganych danych
  - `401`: Nieprawidłowe hasło
  - `404`: Użytkownik nie znaleziony
  - `500`: Błąd serwera

### Pobierz aktualnego użytkownika

- **URL**: `/api/auth/me`
- **Metoda**: `GET`
- **Headers**:
  - `Authorization`: `Bearer {token}`
- **Odpowiedź sukcesu**:

  ```json
  {
    "id": "number",
    "username": "string",
    "email": "string",
    "role": {
      "id": "number",
      "name": "string",
      "description": "string"
    },
    "created_at": "string"
  }
  ```

- **Kody odpowiedzi**:
  - `200`: Dane użytkownika pobrane
  - `401`: Brak autoryzacji
  - `404`: Użytkownik nie znaleziony
  - `500`: Błąd serwera

## Uwagi implementacyjne

1. Bezpieczeństwo:

   - Hasła są hashowane przed zapisaniem w bazie danych (bcrypt)
   - Tokeny JWT mają ograniczony czas ważności
   - Walidacja danych wejściowych przed przetworzeniem

2. Walidacja:

   - Username: 3-20 znaków, tylko litery, cyfry i podkreślenia
   - Email: poprawny format adresu email
   - Hasło: minimum 8 znaków, wymagana duża litera, cyfra i znak specjalny

3. Role użytkowników:

   - Domyślna rola przy rejestracji: "user"
   - Role specjalne (np. "admin") mogą być przypisane tylko przez administratora
   - Każda rola ma określony zestaw uprawnień

4. Tokeny JWT:
   - Zawierają ID użytkownika, nazwę użytkownika i rolę
   - Czas ważności: 24 godziny (konfigurowalny)
   - Wymagane do dostępu do chronionych endpointów
