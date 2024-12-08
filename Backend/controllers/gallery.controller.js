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
  const { category } = req.params;

  try {
    const gallery = await galleryModel.findAllImagesByCategory(category);
    if (!gallery) {
      return res.status(404).json({ message: 'Zdjęcie nie znalezione' });
    }
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja `addImage` jest funkcją asynchroniczną, która dodaje obraz do galerii i zwraca ID wstawionego obrazu.
 * @param req - Parametr `req` w funkcji `addImage` zazwyczaj reprezentuje obiekt żądania w handlerze trasy Express.
 * Zawiera informacje o przychodzącym żądaniu HTTP, takie jak nagłówki żądania, parametry, ciało i więcej. W tej  *  *
 * konkretnej funkcji `req.body` jest używane do wyodrębnienia `user_id`, `image_url` i `alt_text`.
 * @param res - Parametr `res` w funkcji `addImage` jest obiektem odpowiedzi, który będzie używany do wysłania
 * odpowiedzi z powrotem do klienta składającego żądanie. Zazwyczaj jest używany do ustawiania kodu statusu HTTP i
 * wysyłania danych z powrotem do klienta w formie JSON lub innych formatów.
 */

const addImage = async (req, res) => {
  const { user_id, image_url, alt_text } = req.body;

  try {
    const result = await galleryModel.addImage(user_id, image_url, alt_text);
    res.status(201).json({ message: 'Image added to gallery', imageId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja `deleteImage` usuwa obraz z galerii za pomocą jego ID i zwraca komunikat o sukcesie, jeśli usunięcie się  *
 * powiedzie.
 * @param req - Parametr `req` w funkcji `deleteImage` zazwyczaj reprezentuje obiekt żądania HTTP, który zawiera
 * informacje o przychodzącym żądaniu od klienta, takie jak nagłówki, parametry, treść itp. W tej konkretnej funkcji
 * `req.params` jest używane do wyodrębnienia parametru `id`.
 * @param res - Parametr `res` w funkcji `deleteImage` jest obiektem odpowiedzi reprezentującym odpowiedź HTTP, którą
 * handler trasy Express wysyła po otrzymaniu żądania HTTP. Jest używany do wysyłania odpowiedzi z powrotem do klienta
 * składającego żądanie. W podanym fragmencie kodu `res` jest używane do wysyłania odpowiedzi JSON z komunikatem o
 * sukcesie lub błędzie.
 * @returns Jeśli usunięcie obrazu się powiedzie, funkcja zwróci odpowiedź JSON z komunikatem 'Zdjęcie usunięte'. Jeśli
 * obraz o określonym ID nie zostanie znaleziony w bazie danych, zwróci kod statusu 404 z odpowiedzią JSON zawierającą
 * komunikat 'Zdjęcie nie znalezione'.
 */
const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await galleryModel.deleteImageById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Zdjęcie nie znalezione' });
    }
    res.json({ message: 'Zdjęcie usunięte' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getGallery,
  getImagesByCategory,
  addImage,
  deleteImage
};
