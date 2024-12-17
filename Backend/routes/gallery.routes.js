const express = require('express');
const router = express.Router();
const {
  addImage,
  getImagesByCategory,
  deleteImageById,
  getGallery,
  updateImageDetails,
  createNewCategory,
  getGalleryCategories,
} = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Pobierz wszystkie kategorie (musi być przed /:category)
router.get('/categories', getGalleryCategories);

// Pobierz wszystkie zdjęcia
router.get('/', getGallery);

// Pobierz zdjęcia po kategorii
router.get('/category/:category', getImagesByCategory);

// Dodaj nowe zdjęcie (tylko dla admina)
router.post('/', authMiddleware, addImage);

// Zaktualizuj szczegóły zdjęcia (tylko dla admina)
router.put('/:image_id', authMiddleware(['admin']), updateImageDetails);

// Usuń zdjęcie (tylko dla admina)
router.delete('/:image_id', authMiddleware(['admin']), deleteImageById);

// Utwórz nową kategorię (tylko dla admina)
router.post('/category', authMiddleware(['admin']), createNewCategory);

module.exports = router;
