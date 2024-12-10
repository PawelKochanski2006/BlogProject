const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const galleryRoutes = require('./routes/gallery.routes');

// Wczytaj zmienne środowiskowe
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
