const express = require('express');
const router = express.Router();
const { addComment, getCommentsByPostId, deleteComment } = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie komentarze dla danego posta
router.get('/:postId', getCommentsByPostId);

// Dodaj nowy komentarz
router.post('/', authMiddleware, addComment);

// Usuń komentarz
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
