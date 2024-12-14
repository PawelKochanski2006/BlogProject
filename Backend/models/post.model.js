const db = require('../config/db.config');

/**
 * Funkcja `findAllPosts` pobiera szczegółowe informacje o postach, w tym ID posta, tytuł,
 * opis, autora, kategorię i więcej z bazy danych.
 * @returns Funkcja `findAllPosts` zwraca Promise, który wykonuje zapytanie do bazy danych w celu pobrania listy
 * postów z różnymi szczegółami, takimi jak ID posta, tytuł, opis, URL miniatury, czas czytania,
 * wyświetlenia, liczba polubień, liczba komentarzy, kategoria, autor i data utworzenia. Posty są grupowane według
 * określonych pól i sortowane według daty utworzenia w kolejności malejącej. Jeśli zapytanie zakończy się sukcesem, funkcja zwraca
 */
const findAllPosts = (page = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    // Oblicz offset na podstawie strony i limitu
    const offset = (page - 1) * limit;
    
    // Najpierw pobierz całkowitą liczbę postów
    db.query('SELECT COUNT(*) as total FROM posts', (err, countResults) => {
      if (err) return reject(err);
      
      const total = countResults[0].total;
      const totalPages = Math.ceil(total / limit);

      // Następnie pobierz posty dla danej strony
      db.query(`SELECT
                  p.id AS post_id,
                  p.title,
                  p.description,
                  p.image_url AS thumbnail,
                  p.read_time,
                  p.views,
                  p.likes_count,
                  COUNT(c.id) AS comments_count,
                  cat.name AS category,
                  u.username AS author,
                  p.created_at
              FROM
                  posts p
              LEFT JOIN
                  comments c ON p.id = c.post_id
              LEFT JOIN
                  categories cat ON p.category_id = cat.id
              JOIN
                  users u ON p.created_by = u.id
              GROUP BY
                  p.id, p.title, p.description, p.image_url, p.read_time, p.views, p.likes_count, cat.name
              ORDER BY
                  p.created_at DESC
              LIMIT ? OFFSET ?;
      `, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve({
          posts: results,
          currentPage: page,
          totalPages: totalPages,
          totalPosts: total
        });
      });
    });
  });
};

// Funkcja do wyświetlania szczegółów posta
/**
 * Funkcja `findPostDetails` pobiera szczegółowe informacje o konkretnym poście z bazy danych
 * na podstawie podanego ID posta.
 * @param postId - Funkcja `findPostDetails` jest zaprojektowana do pobierania szczegółów konkretnego posta
 * z bazy danych na podstawie podanego `postId`. Zapytanie SQL pobiera różne informacje związane z
 * postem, takie jak ID posta, tytuł, opis, czas czytania, wyświetlenia, liczba polubień, URL głównego obrazu,
 * kategoria,
 * @returns Funkcja `findPostDetails` zwraca Promise, który wykonuje zapytanie do bazy danych w celu pobrania
 * szczegółów konkretnego posta na podstawie podanego `postId`. Funkcja pobiera informacje takie jak
 * ID posta, tytuł, opis, czas czytania, wyświetlenia, liczba polubień, URL głównego obrazu, kategoria, nazwa autora,
 * tagi związane z postem i dodatkowe obrazy związane z postem. Zapytanie łączy
 * wiele tabel (posts
 */
const findPostDetails = (postId) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT
                p.id AS post_id,
                p.title,
                p.description,
                p.read_time,
                p.views,
                p.likes_count,
                p.image_url AS main_image,
                p.created_at,
                cat.name AS category,
                u.username AS author,
                GROUP_CONCAT(t.name) AS tags,
                GROUP_CONCAT(pi.image_url SEPARATOR ', ') AS additional_images
              FROM
                posts p
              LEFT JOIN
                categories cat ON p.category_id = cat.id
              LEFT JOIN
                post_tags pt ON p.id = pt.post_id
              LEFT JOIN
                tags t ON pt.tag_id = t.id
              LEFT JOIN
                post_images pi ON p.id = pi.post_id
              JOIN
                users u ON p.created_by = u.id
              WHERE
                p.id = ?
              GROUP BY
                p.id, p.title, p.description, p.read_time, p.views, p.likes_count, p.image_url, p.created_at, cat.name;
    `, [postId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

/**
 * Funkcja `addLikeToPost` dodaje polubienie do posta w bazie danych i aktualizuje liczbę polubień dla
 * tego posta.
 * @param postId - Parametr `postId` reprezentuje unikalny identyfikator posta, do którego dodawane jest polubienie.
 * @param userId - Parametr `userId` w funkcji `addLikeToPost` reprezentuje unikalny
 * identyfikator użytkownika, który polubił post. Ten parametr jest używany do powiązania użytkownika z
 * akcją polubienia posta w bazie danych.
 * @returns Funkcja `addLikeToPost` zwraca Promise.
 */
const addLikeToPost = (postId, userId) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)', [postId, userId], (err, results) => {
      if (err) return reject(err);
      db.query('UPDATE posts SET likes_count = (SELECT COUNT(*) FROM post_likes WHERE post_id = ?) WHERE id = ?', [postId, postId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  });
};

// TODO: Translate the following comment to Polish
/**
 * The function `removeLikeFromPost` removes a like from a post in a database and updates the likes
 * count for that post.
 * @param postId - The `postId` parameter represents the unique identifier of the post from which you
 * want to remove a like. It is used to identify the specific post in the database.
 * @param userId - The `userId` parameter in the `removeLikeFromPost` function represents the ID of the
 * user who wants to remove their like from a post. This function is designed to remove a like from a
 * post in a database by deleting the corresponding entry in the `post_likes` table and updating the `
 * @returns The `removeLikeFromPost` function returns a Promise.
 */
const removeLikeFromPost = (postId, userId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?', [postId, userId], (err, results) => {
      if (err) return reject(err);
      db.query('UPDATE posts SET likes_count = (SELECT COUNT(*) FROM post_likes WHERE post_id = ?) WHERE id = ?', [postId, postId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  });
};

/**
 * Funkcja `incrementPostViews` aktualizuje liczbę wyświetleń posta w bazie danych, zwiększając ją
 * o 1.
 * @param postId - Parametr `postId` jest unikalnym identyfikatorem posta, dla którego chcesz
 * zwiększyć liczbę wyświetleń w bazie danych.
 * @returns Funkcja `incrementPostViews` zwraca Promise.
 */
const incrementPostViews = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE posts SET views = views + 1 WHERE id = ?', [postId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `editPost` aktualizuje tytuł, opis, główny obraz i dodatkowe obrazy posta w
 * tabeli bazy danych.
 * @param postId - Parametr `postId` w funkcji `editPost` reprezentuje unikalny identyfikator
 * posta, który chcesz edytować. Jest używany do identyfikacji konkretnego posta w bazie danych, który chcesz
 * zaktualizować nowymi informacjami podanymi w `title`, `description`, `imageUrl` i
 * `additional
 * @param title - Parametr `title` w funkcji `editPost` odnosi się do nowego tytułu, który chcesz
 * zaktualizować dla konkretnego posta zidentyfikowanego przez `postId`.
 * @param description - Funkcja `editPost`, którą podałeś, służy do aktualizacji posta w bazie danych. Przyjmuje
 * parametry takie jak `postId`, `title`, `description`, `imageUrl` i `additionalImages`.
 * Funkcja aktualizuje tytuł posta, opis i URL obrazu w tabeli `posts`
 * @param imageUrl - Parametr `imageUrl` w funkcji `editPost` reprezentuje URL głównego
 * obrazu związanego z edytowanym postem. Ten URL jest używany do aktualizacji pola `image_url` w
 * tabeli `posts` dla określonego `postId`.
 * @param additionalImages - Parametr `additionalImages` w funkcji `editPost` reprezentuje
 * tablicę URL obrazów, które są związane z postem zidentyfikowanym przez `postId`. Te dodatkowe
 * obrazy zostaną zaktualizowane w bazie danych wraz z tytułem posta, opisem i URL głównego obrazu
 * gdy funkcja `editPost`
 * @returns Funkcja `editPost` zwraca Promise.
 */
const editPost = (postId, title, description, imageUrl, additionalImages) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE posts
              SET
                title = ?,
                description = ?,
                image_url = ?,
                updated_at = NOW()
              WHERE
                id = ?;`, [title, description, imageUrl, postId], (err, results) => {
      if (err) return reject(err);

      db.query(`DELETE FROM post_images WHERE post_id = ?;`, [postId], (err) => {
        if (err) return reject(err);

        const imageValues = additionalImages.map(image => [postId, image]);
        db.query(`INSERT INTO post_images (post_id, image_url) VALUES ?;`, [imageValues], (err) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
    });
  });
};

/**
 * Funkcja `deletePostById` usuwa post na podstawie jego ID wraz z powiązanymi danymi z powiązanych
 * tabel w bazie danych, używając obietnic.
 * @param postId - Funkcja `deletePostById` przyjmuje parametr `postId`, który jest unikalnym
 * identyfikatorem posta, który należy usunąć z bazy danych.
 * @returns Funkcja `deletePostById` zwraca Promise.
 */
const deletePostById = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM posts WHERE id = ?;', [postId], (err, results) => {
      if (err) return reject(err);

      db.query('DELETE FROM post_tags WHERE post_id = ?;', [postId], (err) => {
        if (err) return reject(err);

        db.query('DELETE FROM post_images WHERE post_id = ?;', [postId], (err) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
    });
  });
};

module.exports = {
  findAllPosts,
  findPostDetails,
  addLikeToPost,
  removeLikeFromPost,
  incrementPostViews,
  editPost,
  deletePostById,
};
