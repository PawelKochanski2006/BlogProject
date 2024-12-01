const express = require('express');
const router = express.Router();
const { addPost, getAllPosts, getPostById, deletePost } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie posty (dostępne dla wszystkich)
router.get('/', getAllPosts);

// Dodaj nowy post (tylko dla admina)
router.post('/', authMiddleware, addPost);

// Pobierz post po id (dostępne dla wszystkich)
router.get('/:id', getPostById);

// Usuń post (tylko dla admina)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
