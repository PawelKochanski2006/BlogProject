const commentModel = require('../models/comment.model');

// Funkcja do dodawania nowego komentarza
const addComment = async (req, res) => {
    const { postId, content } = req.body;

    try {
        const result = await commentModel.createComment(postId, content);
        res.status(201).json({ message: 'Komentarz dodany', commentId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do pobierania wszystkich komentarzy dla danego posta
const getAllCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await commentModel.findAllCommentsByPostId(postId);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Funkcja do usuwania komentarza po ID
const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await commentModel.deleteCommentById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Komentarz nie znaleziony' });
        }
        res.json({ message: 'Komentarz usunięty' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addComment,
    getAllCommentsByPostId,
    deleteComment
};
