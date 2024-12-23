const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Upewnij się, że folder istnieje
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../public/images/gallery/full');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Pobierz wszystkie kategorie
router.get('/categories', galleryController.getGalleryCategories);

// Pobierz wszystkie zdjęcia
router.get('/', galleryController.getGallery);

// Pobierz zdjęcia po kategorii
router.get('/category/:category', galleryController.getImagesByCategory);

// Dodaj nowe zdjęcie (tylko dla admina)
router.post('/',
  authMiddleware(['admin']),
  upload.single('image'),
  galleryController.addImage
);

// Zaktualizuj szczegóły zdjęcia (tylko dla admina)
router.put('/:image_id', authMiddleware(['admin']), galleryController.updateImageDetails);

// Usuń zdjęcie (tylko dla admina)
router.delete('/:image_id', authMiddleware(['admin']), galleryController.deleteImageById);

// Utwórz nową kategorię (tylko dla admina)
router.post('/category', authMiddleware(['admin']), galleryController.createNewCategory);

module.exports = router;
