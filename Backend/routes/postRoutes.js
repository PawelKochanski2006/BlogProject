const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

// Pobierz wszystkie posty
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj nowy post
router.post('/', async (req, res) => {
    try {
        const newPost = await Posts.create(req.body);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Usuń post
router.delete('/:id', async (req, res) => {
    try {
        await Posts.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Post usunięty' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
