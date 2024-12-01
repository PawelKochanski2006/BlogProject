const express = require('express');
const router = express.Router();
const { addImage, getAllImages, getImagesByCategory, deleteImage } = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie zdjęcia (dostępne dla wszystkich)
router.get('/', getAllImages);

// Dodaj nowe zdjęcie (tylko dla admina)
router.post('/', authMiddleware, addImage);

// Pobierz zdjęcie po category (dostępne dla wszystkich)
router.get('/:category', getImagesByCategory);

// Usuń zdjęcie (tylko dla admina)
router.delete('/:id', authMiddleware, deleteImage);

module.exports = router;
