const commentModel = require('../models/comment.model');

/**
 * Funkcja do dodawania nowego komentarza
 * @param req - Obiekt żądania zawierający dane komentarza w req.body
 * @param res - Obiekt odpowiedzi do wysłania odpowiedzi do klienta
 */
const addComment = async (req, res) => {
  try {
    // Sprawdzamy czy mamy wszystkie wymagane dane
    if (!req.body.postId || !req.body.content) {
      return res.status(400).json({
        message: 'Brak wymaganych danych',
        required: ['postId', 'content'],
        received: req.body,
      });
    }

    // Pobieramy dane z req.body i req.user
    const postId = Number(req.body.postId);
    const userId = req.body.userId;
    const content = req.body.content;
    const parentCommentId = req.body.parentCommentId ? Number(req.body.parentCommentId) : null;

    // Sprawdzamy czy postId jest prawidłową liczbą
    if (isNaN(postId)) {
      return res.status(400).json({
        message: 'Nieprawidłowy format postId',
        received: req.body.postId,
      });
    }

    // Debug log
    console.log('Processing comment data:', {
      postId,
      userId,
      content,
      parentCommentId,
    });

    const result = await commentModel.addComment(postId, userId, content, parentCommentId);

    res.status(201).json({
      message: 'Komentarz dodany pomyślnie',
      commentId: result.insertId,
      data: {
        postId,
        userId,
        content,
        parentCommentId,
      },
    });
  } catch (err) {
    console.error('Error in addComment controller:', err);
    res.status(500).json({
      message: 'Błąd podczas dodawania komentarza',
      error: err.message,
      details: err,
    });
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
    console.error('Error in getCommentsByPostId controller:', err);
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
