const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsernameOrEmail } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Rejestracja użytkownika
 * @param {Object} req - Obiekt żądania HTTP
 * @param {Object} res - Obiekt odpowiedzi HTTP
 */
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Logowanie użytkownika
 * @param {Object} req - Obiekt żądania HTTP
 * @param {Object} res - Obiekt odpowiedzi HTTP
 */
const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  login
};
