const express = require('express');
const router = express.Router();
const {
  addPost,
  getAllPosts,
  getPostById,
  deletePostById,
  addLike,
  removeLike,
  incrementPostViews,
  editPost,
  checkLikeStatus
} = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie posty (dostępne dla wszystkich)
router.get('/', getAllPosts);

// Pobierz post po id (dostępne dla wszystkich)
router.get('/:id', getPostById);

// Sprawdź status polubienia (musi być przed /:id/like)
router.get('/:postId/like/status', authMiddleware(), checkLikeStatus);

// Dodaj polubienie do posta (tylko dla zalogowanych użytkowników)
router.post('/:postId/like', authMiddleware(), addLike);

// Usuń polubienie z posta (tylko dla zalogowanych użytkowników)
router.delete('/:postId/like', authMiddleware(), removeLike);

// Zwiększ liczbę wyświetleń posta (dostępne dla wszystkich)
router.post('/:postId/views', incrementPostViews);

// Dodaj nowy post (tylko dla admina)
router.post('/', authMiddleware(['admin']), addPost);

// Usuń post (tylko dla admina)
router.delete('/:postId', authMiddleware(['admin']), deletePostById);

// Edytuj post (tylko dla admina)
router.put('/:postId', authMiddleware(['admin']), editPost);

module.exports = router;
