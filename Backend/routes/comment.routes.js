const express = require('express');
const router = express.Router();
const {
  addComment,
  getCommentsByPostId,
  deleteComment,
  editComment
} = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie komentarze dla danego posta (dostępne dla wszystkich)
router.get('/:postId', getCommentsByPostId);

// Dodaj nowy komentarz (tylko dla zalogowanych użytkowników)
router.post('/', authMiddleware, addComment);

// Usuń komentarz (tylko dla admina)
router.delete('/:id', authMiddleware, deleteComment);

// Edytuj komentarz (tylko dla zalogowanych użytkowników)
router.put('/:id', authMiddleware, editComment);

module.exports = router;
