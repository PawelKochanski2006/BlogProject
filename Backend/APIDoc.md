# Blog Project API Documentation

## Overview

API dla bloga umożliwiająca zarządzanie postami, komentarzami, galerią zdjęć oraz użytkownikami. API obsługuje uwierzytelnianie użytkowników, role (admin/user) oraz różne operacje CRUD.

## Główne funkcjonalności

- Uwierzytelnianie użytkowników (rejestracja, logowanie)
- Zarządzanie postami (dodawanie, edycja, usuwanie)
- System komentarzy (dodawanie, edycja, odpowiedzi)
- Galeria zdjęć (kategorie, upload, zarządzanie)
- System polubień postów
- Licznik wyświetleń postów

## Dokumentacja szczegółowa

### [Autentykacja](./docs/auth.md)

Endpointy związane z rejestracją, logowaniem i zarządzaniem użytkownikami.

### [Posty](./docs/posts.md)

Endpointy do zarządzania postami, polubieniami i wyświetleniami.

### [Komentarze](./docs/comments.md)

Endpointy do zarządzania komentarzami i odpowiedziami.

### [Galeria](./docs/gallery.md)

Endpointy do zarządzania zdjęciami i kategoriami galerii.

## Technologie

- Node.js + Express
- MySQL
- JWT do uwierzytelniania
- Multer do obsługi plików

## Wymagania

- Node.js
- MySQL
- Zmienne środowiskowe (.env):
  - PORT
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - JWT_SECRET
  - TOKEN_LIFETIME

## Instalacja

1. Sklonuj repozytorium
2. Przejdz do konsoli
3. Przejdz do folderu backend: `cd Backend`
4. Zainstaluj zależności: `npm install`
5. Skonfiguruj plik .env
6. Uruchom serwer: `npm start`
