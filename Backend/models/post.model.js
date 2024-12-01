const db = require('../config/db.config');

// Funkcja do dodawania nowego posta
const createPost = (title, content, tags = null) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO posts (title, content, tags) VALUES (?, ?, ?)',
      [title, content, thumbnail, tags],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

// Funkcja do znajdowania wszystkich postów
const findAllPosts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Funkcja do znajdowania posta po ID
const findPostById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

// Funkcja do usuwania posta po ID
const deletePostById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM posts WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Eksport funkcji
module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  deletePostById,
};
