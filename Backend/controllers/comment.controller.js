const commentModel = require('../models/comment.model');

/**
 * Funkcja do dodawania nowego komentarza
 * @param req - Obiekt żądania zawierający dane komentarza w req.body
 * @param res - Obiekt odpowiedzi do wysłania odpowiedzi do klienta
 */
const addComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  try {
    const result = await commentModel.addComment(postId, userId, content);
    res.status(201).json({ message: 'Comment added', commentId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do pobierania wszystkich komentarzy dla danego posta
 * @param req - Obiekt żądania zawierający ID posta w req.params
 * @param res - Obiekt odpowiedzi do wysłania odpowiedzi do klienta
 */
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentModel.findCommentsByPostId(postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do usuwania komentarza po ID
 * @param req - Obiekt żądania zawierający ID komentarza w req.params
 * @param res - Obiekt odpowiedzi do wysłania odpowiedzi do klienta
 */
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await commentModel.deleteComment(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Komentarz nie znaleziony' });
    }
    res.status(200).json({ message: 'Komentarz usunięty' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do edytowania komentarza po ID
 * @param req - Obiekt żądania zawierający ID komentarza w req.params oraz nową treść w req.body
 * @param res - Obiekt odpowiedzi do wysłania odpowiedzi do klienta
 */
const editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const result = await commentModel.editComment(id, content);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Komentarz nie znaleziony' });
    }
    res.status(200).json({ message: 'Komentarz zaktualizowany' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addComment,
  getCommentsByPostId,
  deleteComment,
  editComment,
};
