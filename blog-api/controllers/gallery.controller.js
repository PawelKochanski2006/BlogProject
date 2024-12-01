const galleryModel = require('../models/gallery.model');

// Funkcja do dodawania nowego zdjęcia
const addImage = async (req, res) => {
    const { category, imageUrl } = req.body;

    try {
        const result = await galleryModel.addImage(category, imageUrl);
        res.status(201).json({ message: 'Zdjęcie dodane', galleryId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do pobierania wszystkich zdjęć
const getAllImages = async (req, res) => {
    try {
        const galleries = await galleryModel.findAllImages();
        res.json(galleries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do pobierania zdjęcia po category
const getImagesByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const gallery = await galleryModel.findImagesByCategory(category);
        if (!gallery) {
            return res.status(404).json({ message: 'Zdjęcie nie znalezione' });
        }
        res.json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do usuwania zdjęcia po ID
const deleteImage = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await galleryModel.deleteImageById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Zdjęcie nie znalezione' });
        }
        res.json({ message: 'Zdjęcie usunięte' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addImage,
    getAllImages,
    getImagesByCategory,
    deleteImage
};
