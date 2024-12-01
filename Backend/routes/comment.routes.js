const express = require('express');
const router = express.Router();
const { addComment, getAllCommentsByPostId, deleteComment } = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Dodaj nowy komentarz
router.post('/', authMiddleware, addComment);

// Pobierz wszystkie komentarze dla danego posta
router.get('/:postId', getAllCommentsByPostId);

// Usuń komentarz
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
