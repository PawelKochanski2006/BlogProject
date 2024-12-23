const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Wczytaj zmienne środowiskowe
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Konfiguracja CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Zwiększ limity dla parsera
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Konfiguracja ścieżek statycznych
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Trasy
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Wystąpił błąd serwera',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
