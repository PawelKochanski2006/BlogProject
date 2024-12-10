const db = require('../config/db.config');

/**
 * Funkcja `findAllImages` pobiera dane obrazów z tabeli bazy danych i zwraca obietnicę z wynikami.
 * @returns Funkcja `findAllImages` zwraca obietnicę, która wykonuje zapytanie do bazy danych w celu
 * wybrania informacji o obrazach, w tym ID obrazu, URL obrazu, tekst alternatywny, kategorię, nazwę użytkownika
 * przesyłającego oraz datę utworzenia. Jeśli zapytanie zakończy się sukcesem, obietnica zostanie rozwiązana
 * z wynikami zapytania. W przypadku błędu podczas zapytania, obietnica zostanie odrzucona z błędem.
 */
const findAllImages = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT
                  g.id AS image_id,
                  g.image_url,
                  g.alt_text,
                  gc.name AS category,
                  u.username AS uploaded_by,
                  g.created_at
              FROM
                  gallery g
              LEFT JOIN
                  gallery_categories gc ON g.category_id = gc.id
              JOIN
                  users u ON g.user_id = u.id
              ORDER BY
                  g.created_at DESC;
    `, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `findAllImagesByCategory` pobiera wszystkie obrazy należące do określonej kategorii z bazy danych.
 * @param categoryName - Parametr `categoryName` jest używany do określenia kategorii, dla której chcesz
 * znaleźć wszystkie obrazy. Funkcja `findAllImagesByCategory` przyjmuje ten parametr i wykonuje zapytanie do
 * bazy danych w celu pobrania wszystkich obrazów należących do określonej kategorii.
 * @returns Funkcja `findAllImagesByCategory` zwraca obietnicę, która wykonuje zapytanie do bazy danych w celu
 * znalezienia wszystkich obrazów należących do określonej kategorii. Zapytanie wybiera różne pola, takie jak
 * image_id, image_url, alt_text, nazwa kategorii, nazwa użytkownika przesyłającego oraz znacznik czasu created_at
 * dla obrazów w określonej kategorii. Wyniki są uporządkowane według znacznika czasu created_at w kolejności
 * malejącej. Jeśli nie wystąpią błędy podczas zapytania do bazy danych, obietnica zostanie rozwiązana z wynikami.
 */
const findAllImagesByCategory = (categoryName) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT
                  g.id AS image_id,
                  g.image_url,
                  g.alt_text,
                  gc.name AS category,
                  u.username AS uploaded_by,
                  g.created_at
              FROM
                  gallery g
              JOIN
                  gallery_categories gc ON g.category_id = gc.id
              JOIN
                  users u ON g.user_id = u.id
              WHERE
                  gc.name = ?
              ORDER BY
                  g.created_at DESC;
    `, [categoryName], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `addImage` wstawia nowy obraz do tabeli galerii w bazie danych przy użyciu informacji podanych przez
 * użytkownika.
 * @param user_id - ID użytkownika przesyłającego obraz.
 * @param image_url - Parametr `image_url` to URL obrazu, który chcesz dodać do galerii. Powinien to być ciąg znaków
 * reprezentujący lokalizację lub ścieżkę do pliku obrazu.
 * @param alt_text - Parametr `alt_text` w funkcji `addImage` reprezentuje tekst alternatywny dla obrazu dodawanego do
 * galerii. Tekst alternatywny to opis obrazu używany przez czytniki ekranu dla użytkowników niewidomych lub w
 * sytuacjach, gdy obraz nie może zostać załadowany. Zapewnia tekstową alternatywę dla obrazu.
 * @param category_id - ID kategorii to unikalny identyfikator reprezentujący kategorię, do której należy obraz w
 * galerii.
 * @returns Funkcja `addImage` zwraca obietnicę.
 */
const addImage = (user_id, image_url, alt_text, category_id) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO gallery (user_id, image_url, alt_text, category_id)
              VALUES (?, ?, ?, ?);
    `, [user_id, image_url, alt_text, category_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `updateImageDetails` aktualizuje szczegóły obrazu w bazie danych dla danego ID obrazu.
 * @param image_id - Parametr `image_id` reprezentuje unikalny identyfikator obrazu w bazie danych, który chcesz
 * zaktualizować.
 * @param image_url - Parametr `image_url` reprezentuje URL obrazu, który chcesz zaktualizować w bazie danych.
 * @param alt_text - Parametr `alt_text` w funkcji `updateImageDetails` reprezentuje tekst alternatywny dla obrazu.
 * Tekst alternatywny to opis obrazu używany przez czytniki ekranu dla użytkowników niewidomych lub w sytuacjach, gdy
 * obraz nie może zostać wyświetlony. Zapewnia tekstową alternatywę dla zawartości obrazu.
 * @param category_id - Parametr `category_id` w funkcji `updateImageDetails` reprezentuje kategorię, do której należy
 * obraz. Jest używany do aktualizacji kategorii określonego obrazu w tabeli `gallery` w bazie danych.
 * @returns Funkcja `updateImageDetails` zwraca obietnicę.
 */
const updateImageDetails = (image_id, image_url, alt_text, category_id) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE gallery
              SET image_url = ?, alt_text = ?, category_id = ?
              WHERE id = ?;
    `, [image_url, alt_text, category_id, image_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `deleteImageById` usuwa obraz z tabeli galerii w bazie danych na podstawie podanego ID obrazu.
 * @param image_id - Parametr `image_id` to unikalny identyfikator obrazu, który chcesz usunąć z tabeli `gallery` w
 * bazie danych.
 * @returns Funkcja `deleteImageById` zwraca obietnicę.
 */
const deleteImageById = (image_id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM gallery WHERE id = ?', [image_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `createNewCategory` wstawia nową nazwę kategorii do tabeli `gallery_categories` w bazie danych.
 * @param categoryName - Parametr `categoryName` to ciąg znaków reprezentujący nazwę kategorii, którą chcesz utworzyć i
 * wstawić do tabeli `gallery_categories` w bazie danych.
 * @returns Funkcja `createNewCategory` zwraca obietnicę.
 */
const createNewCategory = (categoryName) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO gallery_categories (name) VALUES (?)', [categoryName], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
    findAllImages,
    findAllImagesByCategory,
    addImage,
    updateImageDetails,
    deleteImageById,
    createNewCategory
};
