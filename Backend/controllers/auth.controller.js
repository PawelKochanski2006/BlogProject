const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser , findUserByUsername } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET; 

// Rejestracja użytkownika
const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser (username, hashedPassword, role);
    res.status(201).send('User  registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

// Logowanie użytkownika
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};

module.exports = {
  register,
  login
};
