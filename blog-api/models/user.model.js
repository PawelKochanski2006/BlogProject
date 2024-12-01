const db = require('../config/db.config');

// Funkcja do dodawania nowego użytkownika
const createUser  = (username, password, role = 'user') => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Funkcja do znajdowania użytkownika po nazwie użytkownika
const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

module.exports = {
  createUser,
  findUserByUsername
};
