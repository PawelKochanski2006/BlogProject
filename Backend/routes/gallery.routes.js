const express = require('express');
const router = express.Router();
const {
  addImage,
  getImagesByCategory,
  deleteImageById,
  getGallery,
  updateImageDetails,
  createNewCategory
} = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie zdjęcia (dostępne dla wszystkich)
router.get('/', getGallery);

// Pobierz zdjęcia po kategorii (dostępne dla wszystkich)
router.get('/:category', getImagesByCategory);

// Dodaj nowe zdjęcie (tylko dla admina)
router.post('/', authMiddleware, addImage);

// Zaktualizuj szczegóły zdjęcia (tylko dla admina)
router.put('/:image_id', authMiddleware, updateImageDetails);

// Usuń zdjęcie (tylko dla admina)
router.delete('/:image_id', authMiddleware, deleteImageById);

// Utwórz nową kategorię (tylko dla admina)
router.post('/category', authMiddleware, createNewCategory);

module.exports = router;
