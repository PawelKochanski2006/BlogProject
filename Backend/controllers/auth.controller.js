const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  createUser,
  findUserByUsernameOrEmail,
  getCurrentUserById,
} = require('../models/user.model');

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
    // Sprawdź dane wejściowe
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        message: 'Nazwa użytkownika/email i hasło są wymagane',
      });
    }

    const user = await findUserByUsernameOrEmail(usernameOrEmail);
    console.log('Found user:', user); // Log do debugowania

    if (!user) {
      return res.status(404).json({
        message: 'Użytkownik nie został znaleziony',
      });
    }

    // Sprawdź czy mamy password_hash
    if (!user.password_hash) {
      console.error('Missing password_hash for user:', user.username);
      return res.status(500).json({
        message: 'Błąd weryfikacji hasła',
      });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({
          message: 'Nieprawidłowe hasło',
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role_name,
        },
        JWT_SECRET,
        { expiresIn: process.env.TOKEN_LIFETIME || '24h' }
      );

      // Przygotuj obiekt użytkownika bez wrażliwych danych
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: {
          id: user.role_id,
          name: user.role_name,
          description: user.role_description,
        },
        created_at: user.created_at,
      };

      // Zwróć zarówno token jak i dane użytkownika
      res.json({
        token,
        user: userResponse,
      });
    } catch (bcryptError) {
      console.error('Bcrypt compare error:', bcryptError);
      return res.status(500).json({
        message: 'Błąd weryfikacji hasła',
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      message: 'Wystąpił błąd serwera',
    });
  }
};

/**
 * Pobiera dane aktualnie zalogowanego użytkownika
 * @param {Object} req - Obiekt żądania HTTP
 * @param {Object} res - Obiekt odpowiedzi HTTP
 */
const getCurrentUser = async (req, res) => {
  try {
    // const userId = req.user.id;
    const user = await findUserByUsernameOrEmail(req.user.username); // Zmienione na pełne dane

    if (!user) {
      return res.status(404).json({
        message: 'Użytkownik nie został znaleziony',
      });
    }

    // Przygotuj odpowiedź bez wrażliwych danych
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: {
        id: user.role_id,
        name: user.role_name,
        description: user.role_description,
      },
      created_at: user.created_at,
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({
      message: 'Wystąpił błąd serwera',
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
