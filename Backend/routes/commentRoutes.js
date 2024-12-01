const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

// Pobierz komentarze dla posta
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comments.findAll({ where: { postId: req.params.postId } });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj komentarz
router.post('/', async (req, res) => {
    try {
        const newComment = await Comments.create(req.body);
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
