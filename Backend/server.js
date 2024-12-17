const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const galleryRoutes = require('./routes/gallery.routes');
const path = require('path');

// Wczytaj zmienne środowiskowe
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serwowanie statycznych plików
// app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(
  '/images',
  express.static(path.join(__dirname, 'public/images'), {
    // Opcje dla express.static
    dotfiles: 'deny', // nie pozwalaj na dostęp do plików zaczynających się od kropki
    etag: true, // włącz etagi dla lepszego cachowania
    maxAge: '1d', // cache na 1 dzień
  })
);

// Trasy
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/gallery', galleryRoutes);

// Obsługa błędów
app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
