const galleryModel = require('../models/gallery.model');

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
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
 * z danymi lub komunikatami o błędach. W podanym fragmencie kodu `res` jest używane do wysyłania odpowiedzi JSON z
 * galerią.
 * @returns Jeśli `gallery` zostanie pomyślnie znalezione dla określonej kategorii, zostanie zwrócone jako odpowiedź
 * JSON za pomocą `res.json(gallery)`. Jeśli `gallery` nie zostanie znalezione (tj. `!gallery` jest prawdziwe),
 * zostanie zwrócony kod statusu 404 z odpowiedzią JSON `{ message: 'Zdjęcie nie znalezione' }`. Jeśli wystąpi błąd
 * podczas przetwarzania żądania, zostanie zwrócony kod statusu 500 z odpowiedzią JSON zawierającą komunikat o błędzie.
 */
const getImagesByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const images = await galleryModel.findAllImagesByCategory(categoryName);
    if (!images.length) {
      return res.status(404).json({ message: 'Zdjęcie nie znalezione' });
    }
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const { user_id, image_url, alt_text, category_id } = req.body;
    const result = await galleryModel.addImage(user_id, image_url, alt_text, category_id);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const result = await galleryModel.updateImageDetails(image_id, image_url, alt_text, category_id);
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

module.exports = {
  getGallery,
  getImagesByCategory,
  addImage,
  updateImageDetails,
  deleteImageById,
  createNewCategory
};
