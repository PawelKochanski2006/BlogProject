const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ścieżka do folderu uploads
const uploadDir = path.join(__dirname, '../public/images/gallery/full');

// Upewnij się, że folder istnieje
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    fieldSize: 10 * 1024 * 1024 // Zwiększamy limit pola
  },
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Dozwolone są tylko pliki obrazów (jpeg, jpg, png, gif)!'));
  }
}).single('image');

module.exports = upload;
