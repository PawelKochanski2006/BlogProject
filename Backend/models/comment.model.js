const db = require('../config/db.config');

// Funkcja do dodawania nowego komentarza
const createComment = (postId, content) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO comments (postId, content) VALUES (?, ?)',
      [postId, content],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

// Funkcja do znajdowania wszystkich komentarzy dla danego posta
const findAllCommentsByPostId = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM comments WHERE postId = ?', [postId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Funkcja do usuwania komentarza po ID
const deleteCommentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM comments WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  createComment,
  findAllCommentsByPostId,
  deleteCommentById,
};
