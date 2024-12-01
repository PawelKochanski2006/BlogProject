const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Brak tokenu' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token jest nieprawidłowy' });
        req.user = user; // Dodaj użytkownika do żądania
        next();
    });
};

module.exports = authMiddleware;
