const galleryModel = require('../models/gallery.model');
const multer = require('multer');
const path = require('path');

// // Konfiguracja multera dla przesyłania plików
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/gallery/full/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Dozwolone są tylko pliki obrazów!'));
//   },
// }).single('image');

/**
 * Funkcja `getGallery` asynchronicznie pobiera wszystkie obrazy z modelu galerii i wysyła je jako odpowiedź JSON,
 * obsługując błędy poprzez wysłanie kodu statusu 500 z komunikatem o błędzie.
 * @param req - Parametr `req` zazwyczaj reprezentuje obiekt żądania w aplikacjach Node.js. Zawiera informacje o
 * żądaniu HTTP, które wywołało funkcję, takie jak nagłówki, parametry, ciało i więcej. W tym kontekście `req` jest
 * prawdopodobnie używane do obsługi przychodzących żądań do funkcji `getGallery`.
 * @param res - Parametr `res` w funkcji `getGallery` jest obiektem odpowiedzi, który jest używany do wysłania
 * odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do wysyłania danych, takich jak
 * obiekty JSON, z powrotem do klienta. W podanym fragmencie kodu obiekt `res` jest używany do wysyłania odpowiedzi
 * JSON z obrazami.
 */
const getGallery = async (req, res) => {
  try {
    const images = await galleryModel.findAllImages();
    console.log('Fetched images:', images); // debugging
    res.json(images);
  } catch (err) {
    console.error('Error in getGallery:', err);
    res.status(500).json({
      message: 'Wystąpił błąd podczas pobierania galerii',
      error: err.message,
    });
  }
};

/**
 * Funkcja `getImagesByCategory` pobiera obrazy z galerii na podstawie określonej kategorii i zwraca je jako odpowiedź
 * JSON, odpowiednio obsługując błędy.
 * @param req - Parametr `req` w funkcji `getImagesByCategory` oznacza obiekt żądania. Zawiera informacje o żądaniu
 * HTTP złożonym do serwera, w tym parametry żądania, nagłówki, ciało i inne istotne dane. W tym przypadku `req.params`
 * jest używane do wyodrębnienia kategorii.
 * @param res - Parametr `res` w funkcji `getImagesByCategory` jest obiektem odpowiedzi, który będzie używany do
 * wysłania odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do wysyłania odpowiedzi HTTP
 * z danymi lub komunikatami o błędach.
 * @returns Jeśli `gallery` zostanie pomyślnie znalezione dla określonej kategorii, zostanie zwrócone jako odpowiedź
 * JSON za pomocą `res.json(gallery)`. Jeśli `gallery` nie zostanie znalezione (tj. `!gallery` jest prawdziwe),
 * zostanie zwrócony kod statusu 404 z odpowiedzią JSON `{ message: 'Zdjęcie nie znalezione' }`. Jeśli wystąpi błąd
 * podczas przetwarzania żądania, zostanie zwrócony kod statusu 500 z odpowiedzią JSON zawierającą komunikat o błędzie.
 */
const getImagesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.category;
    console.log('Fetching images for category:', categoryId); // debugging
    const images = await galleryModel.findAllImagesByCategory(categoryId);
    res.json(images);
  } catch (err) {
    console.error('Error in getImagesByCategory:', err);
    res.status(500).json({
      message: 'Wystąpił błąd podczas pobierania zdjęć dla kategorii',
      error: err.message,
    });
  }
};

/**
 * Funkcja `addImage` dodaje nowy obraz do galerii, korzystając z danych przesłanych w żądaniu.
 * @param req - Parametr `req` w funkcji `addImage` oznacza obiekt żądania. Zawiera informacje o żądaniu HTTP złożonym
 * do serwera, w tym parametry żądania, nagłówki, ciało i inne istotne dane. W tym przypadku `req.body` jest używane
 * do wyodrębnienia danych obrazu.
 * @param res - Parametr `res` w funkcji `addImage` jest obiektem odpowiedzi, który będzie używany do wysłania
 * odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do wysyłania odpowiedzi HTTP z danymi
 * lub komunikatami o błędach.
 * @returns Jeśli obraz zostanie pomyślnie dodany, zostanie zwrócony kod statusu 201 z odpowiedzią JSON zawierającą
 * szczegóły dodanego obrazu. Jeśli wystąpi błąd podczas przetwarzania żądania, zostanie zwrócony kod statusu 500 z
 * odpowiedzią JSON zawierającą komunikat o błędzie.
 */
const addImage = async (req, res) => {
  try {
    // Obsługa przesyłania pliku
    upload(req, res, async function (err) {
      if (err) {
        console.error('Błąd podczas przesyłania:', err);
        return res.status(400).json({
          message: 'Błąd podczas przesyłania pliku',
          error: err.message,
        });
      }

      // Sprawdzamy czy wszystkie wymagane pola są obecne
      if (!req.file) {
        return res.status(400).json({
          message: 'Nie przesłano pliku',
        });
      }

      if (!req.body.alt_text) {
        return res.status(400).json({
          message: 'Brak opisu alternatywnego',
        });
      }

      if (!req.body.category_id) {
        return res.status(400).json({
          message: 'Nie wybrano kategorii',
        });
      }

      if (!req.body.user_id) {
        return res.status(400).json({
          message: 'Brak ID użytkownika',
        });
      }

      const { user_id, alt_text, category_id } = req.body;
      const image_url = `/images/gallery/full/${req.file.filename}`;

      try {
        const result = await galleryModel.addImage(user_id, image_url, alt_text, category_id);

        console.log('Zapisano obraz:', result);
        return res.status(201).json(result);
      } catch (dbError) {
        console.error('Błąd bazy danych:', dbError);
        return res.status(500).json({
          message: 'Błąd podczas zapisywania w bazie danych',
        });
      }
    });
  } catch (err) {
    console.error('Ogólny błąd:', err);
    return res.status(500).json({
      message: 'Wystąpił nieoczekiwany błąd',
    });
  }
};

/**
 * Funkcja `updateImageDetails` aktualizuje szczegóły obrazu w galerii na podstawie danych przesłanych w żądaniu.
 * @param req - Parametr `req` w funkcji `updateImageDetails` oznacza obiekt żądania. Zawiera informacje o żądaniu HTTP
 * złożonym do serwera, w tym parametry żądania, nagłówki, ciało i inne istotne dane. W tym przypadku `req.body` jest
 * używane do wyodrębnienia danych obrazu, a `req.params` do wyodrębnienia ID obrazu.
 * @param res - Parametr `res` w funkcji `updateImageDetails` jest obiektem odpowiedzi, który będzie używany do
 * wysłania odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do wysyłania odpowiedzi HTTP
 * z danymi lub komunikatami o błędach.
 * @returns Jeśli obraz zostanie pomyślnie zaktualizowany, zostanie zwrócony kod statusu 200 z odpowiedzią JSON
 * zawierającą szczegóły zaktualizowanego obrazu. Jeśli wystąpi błąd podczas przetwarzania żądania, zostanie zwrócony
 * kod statusu 500 z odpowiedzią JSON zawierającą komunikat o błędzie.
 */
const updateImageDetails = async (req, res) => {
  try {
    const { image_url, alt_text, category_id } = req.body;
    const { image_id } = req.params;
    const result = await galleryModel.updateImageDetails(
      image_id,
      image_url,
      alt_text,
      category_id
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja `deleteImageById` usuwa obraz z galerii na podstawie ID obrazu przesłanego w żądaniu.
 * @param req - Parametr `req` w funkcji `deleteImageById` oznacza obiekt żądania. Zawiera informacje o żądaniu HTTP
 * złożonym do serwera, w tym parametry żądania, nagłówki, ciało i inne istotne dane. W tym przypadku `req.params` jest
 * używane do wyodrębnienia ID obrazu.
 * @param res - Parametr `res` w funkcji `deleteImageById` jest obiektem odpowiedzi, który będzie używany do wysłania
 * odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do wysyłania odpowiedzi HTTP z danymi
 * lub komunikatami o błędach.
 * @returns Jeśli obraz zostanie pomyślnie usunięty, zostanie zwrócony kod statusu 200 z odpowiedzią JSON zawierającą
 * szczegóły usuniętego obrazu. Jeśli wystąpi błąd podczas przetwarzania żądania, zostanie zwrócony kod statusu 500 z
 * odpowiedzią JSON zawierającą komunikat o błędzie.
 */
const deleteImageById = async (req, res) => {
  try {
    const { image_id } = req.params;
    const result = await galleryModel.deleteImageById(image_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja `createNewCategory` tworzy nową kategorię w galerii na podstawie danych przesłanych w żądaniu.
 * @param req - Parametr `req` w funkcji `createNewCategory` oznacza obiekt żądania. Zawiera informacje o żądaniu HTTP
 * złożonym do serwera, w tym parametry żądania, nagłówki, ciało i inne istotne dane. W tym przypadku `req.body` jest
 * używane do wyodrębnienia nazwy kategorii.
 * @param res - Parametr `res` w funkcji `createNewCategory` jest obiektem odpowiedzi, który będzie używany do
 * wysłania odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do wysyłania odpowiedzi HTTP
 * z danymi lub komunikatami o błędach.
 * @returns Jeśli kategoria zostanie pomyślnie utworzona, zostanie zwrócony kod statusu 201 z odpowiedzią JSON
 * zawierającą szczegóły nowej kategorii. Jeśli wystąpi błąd podczas przetwarzania żądania, zostanie zwrócony kod
 * statusu 500 z odpowiedzią JSON zawierającą komunikat o błędzie.
 */
const createNewCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const result = await galleryModel.createNewCategory(categoryName);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGalleryCategories = async (req, res) => {
  try {
    const categories = await galleryModel.findAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania kategorii galerii' });
  }
};

module.exports = {
  getGallery,
  getImagesByCategory,
  addImage,
  updateImageDetails,
  deleteImageById,
  createNewCategory,
  getGalleryCategories,
};
