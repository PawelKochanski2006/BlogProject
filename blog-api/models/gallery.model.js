const db = require('../config/db.config');

// Funkcja do znajdowania wszystkich zdjęć
const findAllImages = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM galleries', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Funkcja do znajdowania zdjęcia po category
const findImagesByCategory = (category) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM galleries WHERE category = ?', [category], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

//Funkcja do dodawania nowego zdjęcia
const addImage = (category, imageUrl) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO galleries (category, imageUrl) VALUES (?, ?)', [category, imageUrl], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Funkcja do usuwania zdjęcia po ID
const deleteImageById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM galleries WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  findAllImages,
  findImagesByCategory,
  addImage,
  deleteImageById
};
