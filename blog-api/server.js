const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const galleryRoutes = require('./routes/gallery.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Trasy
app.use('api/auth', authRoutes);
app.use('api/posts', postRoutes);
app.use('api/comments', commentRoutes);
app.use('api/gallery', galleryRoutes);

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
