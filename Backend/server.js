const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { sequelize } = require('./config/db');

// Wczytaj zmienne środowiskowe
dotenv.config();

// Połącz z bazą danych
connectDB();

// Synchronizuj modele z bazą
sequelize.sync({ force: false }).then(() => {
    console.log('Modele zsynchronizowane z bazą danych.');
});

// Stwórz aplikację Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Trasy API
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));

// Uruchom serwer
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
