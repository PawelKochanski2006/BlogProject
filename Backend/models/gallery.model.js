const db = require('../config/db.config');

/**
 * The function `findAllImages` retrieves image data including image ID, URL, alt text, category, and
 * uploader information from a database table and returns a promise with the results.
 * @returns The `findAllImages` function returns a Promise that queries the database to select image
 * information including image ID, image URL, alt text, category, and the username of the user who
 * uploaded the image. The results are ordered by the creation date of the images in descending order.
 * If there are no errors during the database query, the function resolves with the results of the
 * query. If there is an error
 */
const findAllImages = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT
                  g.id AS image_id,
                  g.image_url,
                  g.alt_text,
                  gc.name AS category,
                  u.username AS uploaded_by
              FROM
                  gallery g
              LEFT JOIN
                  gallery_categories gc ON g.category_id = gc.id
              LEFT JOIN
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
 * The function `findAllImagesByCategory` retrieves all images belonging to a specific category from a
 * database.
 * @param categoryName - The `categoryName` parameter in the `findAllImagesByCategory` function is used
 * to specify the category for which you want to retrieve images. When you call this function, you
 * provide the name of the category as an argument, and the function will then query the database to
 * find all images that belong
 * @returns The `findAllImagesByCategory` function returns a Promise that queries the database to find
 * all images in a specific category. The query selects the image ID, image URL, alt text, category
 * name, and the username of the user who uploaded the image. The results are ordered by the creation
 * date of the images in descending order.
 */
const findAllImagesByCategory = (categoryName) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT
                  g.id AS image_id,
                  g.image_url,
                  g.alt_text,
                  gc.name AS category,
                  u.username AS uploaded_by
              FROM
                  gallery g
              LEFT JOIN
                  gallery_categories gc ON g.category_id = gc.id
              LEFT JOIN
                  users u ON g.user_id = u.id
              WHERE
                  g.name = ?
              ORDER BY
                  g.created_at DESC;
    `, [categoryName], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// TODO: Add a documentation comment here
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

const deleteImageById = (image_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM gallery WHERE id = ?', [image_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

//TODO: Add a documentation comment here
//TODO: I will move this function to the galleryCategory.model.js file later 
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
    deleteImageById,
    createNewCategory
};
