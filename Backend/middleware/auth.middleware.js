const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        // Pobierz token z nagłówka
        const token = req.headers['authorization']?.split(' ')[1];

        // Sprawdź, czy token istnieje
        if (!token) {
            return res.status(401).json({
                message: 'Brak autoryzacji',
                error: 'Token nie został dostarczony'
            });
        }

        try {
            // Weryfikacja tokena
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Jeśli zdefiniowano role, sprawdź uprawnienia
            if (roles.length > 0 && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    message: 'Brak uprawnień',
                    error: 'Nie masz wystarczających uprawnień'
                });
            }

            // Dodaj zdekodowane informacje o użytkowniku do żądania
            req.user = decoded;
            next();
        } catch (err) {
            // Różne scenariusze błędów tokena
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Sesja wygasła',
                    error: 'Token utracił ważność'
                });
            }

            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({
                    message: 'Nieprawidłowy token',
                    error: 'Token jest nieprawidłowo sformatowany'
                });
            }

            // Ogólny błąd autoryzacji
            return res.status(500).json({
                message: 'Błąd autoryzacji',
                error: err.message
            });
        }
    };
};

module.exports = authMiddleware;
