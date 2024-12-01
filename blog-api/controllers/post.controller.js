const postModel = require('../models/post.model');

// Funkcja do dodawania nowego posta
const addPost = async (req, res) => {
    const { title, content, thumbnail, tags } = req.body;

    try {
        const result = await postModel.createPost(title, content, thumbnail, tags);
        res.status(201).json({ message: 'Post dodany', postId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do pobierania wszystkich postów
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.findAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do pobierania posta po ID
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.findPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post nie znaleziony' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do usuwania posta po ID
const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await postModel.deletePostById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post nie znaleziony' });
        }
        res.json({ message: 'Post usunięty' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eksport funkcji
module.exports = {
    addPost,
    getAllPosts,
    getPostById,
    deletePost,
};
