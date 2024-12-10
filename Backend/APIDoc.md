# Blog Project API Documentation

## Authentication

### Register
- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Create a new user
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
    "message": "string",
    "userId": "number"
  }
  ```

### Login
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
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

## Posts

### Get All Posts
- **Endpoint:** `/api/posts`
- **Method:** `GET`
- **Description:** Retrieves all posts.
- **Response:**
  ```json
  [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "imageUrl": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
  ```

### Get Post by ID
- **Endpoint:** `/api/posts/:id`
- **Method:** `GET`
- **Description:** Retrieves a post by its ID.
- **Response:**
  ```json
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "created_at": "string",
    "updated_at": "string"
  }
  ```

### Add Post
- **Endpoint:** `/api/posts`
- **Method:** `POST`
- **Description:** Adds a new post. Only accessible by admin.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "categoryId": "number"
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
- **Description:** Edits an existing post. Only accessible by admin.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
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
- **Description:** Deletes a post by its ID. Only accessible by admin.
- **Response:**
  ```json
  {
    "message": "Post deleted"
  }
  ```

### Add Like to Post
- **Endpoint:** `/api/posts/:postId/like`
- **Method:** `POST`
- **Description:** Adds a like to a post. Only accessible by logged-in users.
- **Response:**
  ```json
  {
    "message": "Like added"
  }
  ```

### Remove Like to Post
- **Endpoint:** `/api/posts/:postId/unlike`
- **Method:** `POST`
- **Description:** Removes a like to a post. Only accessible by logged-in users.
- **Response:**
  ```json
  {
    "message": "Like removed"
  }
  ```

### Increment Post Views
- **Endpoint:** `/api/posts/:postId/views`
- **Method:** `POST`
- **Description:** Increments the view count of a post.
- **Response:**
  ```json
  {
    "message": "View count incremented"
  }
  ```

## Comments

### Get Comments by Post ID
- **Endpoint:** `/api/comments/:postId`
- **Method:** `GET`
- **Description:** Retrieves all comments for a specific post.
- **Response:**
  ```json
  [
    {
      "id": "number",
      "postId": "number",
      "name": "string",
      "content": "string",
      "created_at": "string"
    }
  ]
  ```

### Add Comment
- **Endpoint:** `/api/comments`
- **Method:** `POST`
- **Description:** Adds a new comment. Only accessible by logged-in users.
- **Request Body:**
  ```json
  {
    "postId": "number",
    "name": "string",
    "content": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Comment added"
  }
  ```

### Edit Comment
- **Endpoint:** `/api/comments/:id`
- **Method:** `PUT`
- **Description:** Edits an existing comment. Only accessible by logged-in users.
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
- **Description:** Deletes a comment by its ID. Only accessible by admin.
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
- **Description:** Retrieves all images in the gallery.
- **Response:**
  ```json
  [
    {
      "image_id": "number",
      "image_url": "string",
      "alt_text": "string",
      "category": "string",
      "created_at": "string"
    }
  ]
  ```

### Get Images by Category
- **Endpoint:** `/api/gallery/:category`
- **Method:** `GET`
- **Description:** Retrieves images by category.
- **Response:**
  ```json
  [
    {
      "image_id": "number",
      "image_url": "string",
      "alt_text": "string",
      "category": "string",
      "created_at": "string"
    }
  ]
  ```

### Add Image
- **Endpoint:** `/api/gallery`
- **Method:** `POST`
- **Description:** Adds a new image to the gallery. Only accessible by admin.
- **Request Body:**
  ```json
  {
    "user_id": "number",
    "image_url": "string",
    "alt_text": "string",
    "category_id": "number"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Image added"
  }
  ```

### Update Image Details
- **Endpoint:** `/api/gallery/:image_id`
- **Method:** `PUT`
- **Description:** Updates details of an existing image. Only accessible by admin.
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
- **Description:** Deletes an image by its ID. Only accessible by admin.
- **Response:**
  ```json
  {
    "message": "Image deleted"
  }
  ```

### Create New Category
- **Endpoint:** `/api/gallery/category`
- **Method:** `POST`
- **Description:** Creates a new category in the gallery. Only accessible by admin.
- **Request Body:**
  ```json
  {
    "categoryName": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Category created"
  }
  ```
