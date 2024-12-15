# Blog Project API Documentation

## Authentication

### Register
- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Tworzy nowego użytkownika
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string", 
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered",
    "userId": "number"
  }
  ```

### Login
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Uwierzytelnia użytkownika i zwraca token JWT
- **Request Body:**
  ```json
  {
    "usernameOrEmail": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "string"
  }
  ```

### Get Current User
- **Endpoint:** `/api/auth/me`
- **Method:** `GET` 
- **Description:** Pobiera dane aktualnie zalogowanego użytkownika
- **Response:**
  ```json
  {
    "id": "number",
    "username": "string",
    "email": "string",
    "created_at": "string"
  }
  ```

## Posts

### Get All Posts
- **Endpoint:** `/api/posts`
- **Method:** `GET`
- **Description:** Pobiera wszystkie posty
- **Response:**
  ```json
  [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "imageUrl": "string",
      "created_at": "string",
      "updated_at": "string",
      "likes_count": "number",
      "views_count": "number",
      "comments_count": "number",
      "category": {
        "id": "number",
        "name": "string"
      }
    }
  ]
  ```

### Get Post by ID
- **Endpoint:** `/api/posts/:id`
- **Method:** `GET`
- **Description:** Pobiera post po ID
- **Response:**
  ```json
  {
    "id": "number",
    "title": "string", 
    "description": "string",
    "imageUrl": "string",
    "additionalImages": ["string"],
    "created_at": "string",
    "updated_at": "string",
    "likes_count": "number",
    "views_count": "number",
    "comments_count": "number",
    "category": {
      "id": "number",
      "name": "string"
    },
    "isLiked": "boolean"
  }
  ```

### Add Post
- **Endpoint:** `/api/posts`
- **Method:** `POST`
- **Description:** Dodaje nowy post. Dostępne tylko dla admina.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "categoryId": "number",
    "imageUrl": "string",
    "additionalImages": ["string"]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Post added",
    "postId": "number"
  }
  ```

### Edit Post
- **Endpoint:** `/api/posts/:postId`
- **Method:** `PUT`
- **Description:** Edytuje istniejący post. Dostępne tylko dla admina.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "categoryId": "number",
    "imageUrl": "string",
    "additionalImages": ["string"]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Post updated"
  }
  ```

### Delete Post
- **Endpoint:** `/api/posts/:postId`
- **Method:** `DELETE`
- **Description:** Usuwa post. Dostępne tylko dla admina.
- **Response:**
  ```json
  {
    "message": "Post deleted"
  }
  ```

### Add Like to Post
- **Endpoint:** `/api/posts/:postId/like`
- **Method:** `POST`
- **Description:** Dodaje polubienie do posta. Dostępne tylko dla zalogowanych użytkowników.
- **Response:**
  ```json
  {
    "message": "Like added",
    "likes_count": "number"
  }
  ```

### Remove Like from Post
- **Endpoint:** `/api/posts/:postId/unlike`
- **Method:** `POST`
- **Description:** Usuwa polubienie z posta. Dostępne tylko dla zalogowanych użytkowników.
- **Response:**
  ```json
  {
    "message": "Like removed",
    "likes_count": "number"
  }
  ```

### Increment Post Views
- **Endpoint:** `/api/posts/:postId/views`
- **Method:** `POST`
- **Description:** Zwiększa licznik wyświetleń posta
- **Response:**
  ```json
  {
    "message": "View count incremented",
    "views_count": "number"
  }
  ```

## Comments

### Get Comments by Post ID
- **Endpoint:** `/api/comments/:postId`
- **Method:** `GET`
- **Description:** Pobiera wszystkie komentarze dla danego posta
- **Response:**
  ```json
  [
    {
      "id": "number",
      "postId": "number",
      "userId": "number",
      "username": "string",
      "content": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
  ```

### Add Comment
- **Endpoint:** `/api/comments`
- **Method:** `POST`
- **Description:** Dodaje nowy komentarz. Dostępne tylko dla zalogowanych użytkowników.
- **Request Body:**
  ```json
  {
    "postId": "number",
    "content": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Comment added",
    "commentId": "number"
  }
  ```

### Edit Comment
- **Endpoint:** `/api/comments/:id`
- **Method:** `PUT`
- **Description:** Edytuje istniejący komentarz. Dostępne tylko dla autora komentarza.
- **Request Body:**
  ```json
  {
    "content": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Comment updated"
  }
  ```

### Delete Comment
- **Endpoint:** `/api/comments/:id`
- **Method:** `DELETE`
- **Description:** Usuwa komentarz. Dostępne dla admina lub autora komentarza.
- **Response:**
  ```json
  {
    "message": "Comment deleted"
  }
  ```

## Gallery

### Get All Images
- **Endpoint:** `/api/gallery`
- **Method:** `GET`
- **Description:** Pobiera wszystkie zdjęcia z galerii
- **Response:**
  ```json
  [
    {
      "image_id": "number",
      "image_url": "string",
      "alt_text": "string",
      "category": {
        "id": "number",
        "name": "string"
      },
      "created_at": "string",
      "user": {
        "id": "number",
        "username": "string"
      }
    }
  ]
  ```

### Get Images by Category
- **Endpoint:** `/api/gallery/category/:categoryId`
- **Method:** `GET`
- **Description:** Pobiera zdjęcia z danej kategorii
- **Response:**
  ```json
  [
    {
      "image_id": "number",
      "image_url": "string",
      "alt_text": "string",
      "category": {
        "id": "number",
        "name": "string"
      },
      "created_at": "string",
      "user": {
        "id": "number",
        "username": "string"
      }
    }
  ]
  ```

### Add Image
- **Endpoint:** `/api/gallery`
- **Method:** `POST`
- **Description:** Dodaje nowe zdjęcie do galerii. Dostępne tylko dla admina.
- **Request Body:**
  ```json
  {
    "image_url": "string",
    "alt_text": "string",
    "category_id": "number"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Image added",
    "imageId": "number"
  }
  ```

### Update Image Details
- **Endpoint:** `/api/gallery/:image_id`
- **Method:** `PUT`
- **Description:** Aktualizuje szczegóły zdjęcia. Dostępne tylko dla admina.
- **Request Body:**
  ```json
  {
    "image_url": "string",
    "alt_text": "string",
    "category_id": "number"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Image updated"
  }
  ```

### Delete Image
- **Endpoint:** `/api/gallery/:image_id`
- **Method:** `DELETE`
- **Description:** Usuwa zdjęcie. Dostępne tylko dla admina.
- **Response:**
  ```json
  {
    "message": "Image deleted"
  }
  ```

### Get All Categories
- **Endpoint:** `/api/gallery/categories`
- **Method:** `GET`
- **Description:** Pobiera wszystkie kategorie galerii
- **Response:**
  ```json
  [
    {
      "id": "number",
      "name": "string",
      "image_count": "number"
    }
  ]
  ```

### Create New Category
- **Endpoint:** `/api/gallery/categories`
- **Method:** `POST`
- **Description:** Tworzy nową kategorię w galerii. Dostępne tylko dla admina.
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Category created",
    "categoryId": "number"
  }
  ```
