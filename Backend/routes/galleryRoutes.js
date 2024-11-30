const express = require('express');
const router = express.Router();
const { Gallery } = require('../models');

// Pobierz wszystkie obrazy
router.get('/', async (req, res) => {
    try {
        const images = await Gallery.findAll();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj obraz
router.post('/', async (req, res) => {
    try {
        const newImage = await Gallery.create(req.body);
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
