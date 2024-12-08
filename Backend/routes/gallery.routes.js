const express = require('express');
const router = express.Router();
const { addImage, getImagesByCategory, deleteImage, getGallery } = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie zdjęcia (dostępne dla wszystkich)
router.get('/', getGallery);

// Pobierz zdjęcie po category (dostępne dla wszystkich)
router.get('/:category', getImagesByCategory);

// Dodaj nowe zdjęcie (tylko dla admina)
router.post('/', authMiddleware, addImage);

// Usuń zdjęcie (tylko dla admina)
router.delete('/:id', authMiddleware, deleteImage);

module.exports = router;
