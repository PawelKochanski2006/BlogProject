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
  editPost
} = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie posty (dostępne dla wszystkich)
router.get('/', getAllPosts);

// Pobierz post po id (dostępne dla wszystkich)
router.get('/:id', getPostById);

// Dodaj nowy post (tylko dla admina)
router.post('/', authMiddleware(['admin']), addPost);

// Usuń post (tylko dla admina)
router.delete('/:postId', authMiddleware(['admin']), deletePostById);

// Dodaj polubienie do posta (tylko dla zalogowanych użytkowników)
// router.post('/:postId/like', authMiddleware, addLikeToPost);
router.post('/:postId/like', authMiddleware(), addLike);

router.post('/:postId/unlike', authMiddleware(), removeLike);

// Zwiększ liczbę wyświetleń posta (dostępne dla wszystkich)
router.post('/:postId/views', incrementPostViews);

// Edytuj post (tylko dla admina)
router.put('/:postId', authMiddleware(['admin']), editPost);

module.exports = router;
