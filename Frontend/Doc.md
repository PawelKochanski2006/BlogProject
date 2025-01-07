# Dokumentacja projektu TerraLiving

## Wprowadzenie
TerraLiving to aplikacja webowa, która umożliwia użytkownikom przeglądanie, dodawanie i komentowanie zdjęć w galerii. Użytkownicy mogą się rejestrować, logować oraz zarządzać swoimi zdjęciami.

## Technologie
- **React**: Biblioteka do budowy interfejsów użytkownika.
- **React Router**: Do zarządzania trasami w aplikacji.
- **Axios**: Do wykonywania zapytań HTTP.
- **Tailwind CSS**: Do stylizacji komponentów.
- **Framer Motion**: Do animacji.
- **Masonry**: Do układania zdjęć w formie siatki.

## Struktura projektu
  Frontend/
  ├── public/
  │ └── index.html
  ├── src/
  │ ├── api/
  │ │ └── apiClient.js
  │ ├── components/
  │ │ ├── Comments/
  │ │ ├── Footer/
  │ │ ├── Gallery/
  │ │ ├── Header/
  │ │ ├── Posts/
  │ │ └── common/
  │ ├── contexts/
  │ │ └── AuthContext.jsx
  │ ├── pages/
  │ │ └── Gallery.page.jsx
  │ ├── App.js
  │ └── index.js
  ├── styles/
  │ └── index.css
  └── package.json

## Instalacja
1. **Instalacja zależności**:
   ```bash
   cd Frontend
   npm install
   ```

2. **Ustawienie zmiennych środowiskowych**:
   Utwórz plik `.env` w katalogu głównym projektu i dodaj:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Uruchomienie aplikacji**:
   ```bash
   npm start
   ```

## Użycie
- **Rejestracja**: Użytkownicy mogą się rejestrować, wypełniając formularz rejestracji.
- **Logowanie**: Użytkownicy mogą się logować, aby uzyskać dostęp do pełnej funkcjonalności.
- **Dodawanie zdjęć**: Użytkownicy z rolą admina mogą dodawać zdjęcia do galerii.
- **Komentowanie**: Użytkownicy mogą komentować zdjęcia.
