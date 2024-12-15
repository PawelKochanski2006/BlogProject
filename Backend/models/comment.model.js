const db = require('../config/db.config');

/**
 * Funkcja `findCommentsByPostId` pobiera komentarze dla określonego ID posta z bazy danych i
 * zwraca je w ustrukturyzowanym formacie.
 * @param postId - Parametr `post_id` jest używany do określenia ID posta, dla którego chcesz
 * pobrać komentarze. Funkcja `findCommentsByPostId` przyjmuje ten `post_id` jako wejście, a następnie
 * wykonuje zapytanie do bazy danych, aby pobrać komentarze związane z tym konkretnym ID posta.
 * @returns Funkcja `findCommentsByPostId` zwraca Promise, który wykonuje zapytanie do bazy danych w celu
 * pobrania komentarzy związanych z określonym ID posta. Zapytanie wybiera ID komentarza, treść, ID
 * nadrzędnego komentarza, nazwę użytkownika autora oraz datę utworzenia każdego komentarza związanego
 * z danym ID posta. Wyniki są uporządkowane najpierw według ID nadrzędnego komentarza (jeśli dostępne),
 * a następnie według daty utworzenia. Jeśli są
 */
const findCommentsByPostId = postId => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
          c.id AS comment_id,
          c.content AS comment_content,
          c.parent_comment_id,
          u.username AS author,
          c.created_at
        FROM
          comments c
        JOIN
          users u ON c.user_id = u.id
        WHERE
          c.post_id = ?
        ORDER BY
          COALESCE(c.parent_comment_id, c.id),
          c.created_at;
    `,
      [postId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

/**
 * Funkcja `addComment` wstawia nowy komentarz do tabeli bazy danych z podanym ID posta,
 * ID użytkownika, treścią oraz opcjonalnym ID nadrzędnego komentarza.
 * @param postId - Parametr `post_id` reprezentuje unikalny identyfikator posta, do którego
 * dodawany jest komentarz.
 * @param userId - ID użytkownika to unikalny identyfikator użytkownika, który dodaje komentarz. Pomaga
 * w powiązaniu komentarza z odpowiednim użytkownikiem w bazie danych.
 * @param content - Parametr `content` w funkcji `addComment` reprezentuje tekst lub treść
 * komentarza, który użytkownik chce dodać do posta. Jest to faktyczna wiadomość lub informacja, którą
 * użytkownik chce podzielić się jako komentarz do konkretnego posta.
 * @param [parent_comment_id=null] - Parametr `parent_comment_id` w funkcji `addComment` jest
 * używany do określenia ID nadrzędnego komentarza, jeśli nowy komentarz jest odpowiedzią na istniejący
 * komentarz. Jeśli nowy komentarz nie jest odpowiedzią i jest komentarzem najwyższego poziomu, `parent_comment_id` będzie `null`.
 * @returns Funkcja `addComment` zwraca Promise.
 */
const addComment = (postId, userId, content, parentCommentId = null) => {
  return new Promise((resolve, reject) => {
    console.log('Adding comment to database:', {
      postId,
      userId,
      content,
      parentCommentId,
    });

    db.query(
      `INSERT INTO comments (post_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?);`,
      [postId, userId, content, parentCommentId],
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

/**
 * Funkcja `editComment` aktualizuje treść komentarza w tabeli bazy danych na podstawie
 * podanego ID komentarza.
 * @param commentId - Parametr `comment_id` w funkcji `editComment` odnosi się do unikalnego
 * identyfikatora komentarza, który chcesz zaktualizować. Ten identyfikator jest używany do zlokalizowania
 * konkretnego komentarza w bazie danych i zmodyfikowania jego treści.
 * @param content - Parametr `content` w funkcji `editComment` odnosi się do nowej treści,
 * którą chcesz zaktualizować dla konkretnego komentarza zidentyfikowanego przez jego `comment_id`. Ta treść
 * zastąpi istniejącą treść komentarza w bazie danych.
 * @returns Funkcja `editComment` zwraca Promise.
 */
const editComment = (commentId, content) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE comments
        SET content = ?, updated_at = NOW()
        WHERE id = ?;
  `,
      [content, commentId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

/**
 * Funkcja `deleteComment` usuwa komentarz z tabeli bazy danych na podstawie podanego ID komentarza.
 * @param commentId - Parametr `comment_id` to unikalny identyfikator komentarza, który chcesz
 * usunąć z bazy danych. Ta funkcja `deleteComment` przyjmuje ten `comment_id` jako wejście i
 * usuwa odpowiedni komentarz z tabeli `comments`, gdzie `id` odpowiada podanemu `comment_id`.
 * @returns Funkcja `deleteComment` zwraca Promise.
 */
const deleteComment = commentId => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM comments WHERE id = ?;
  `,
      [commentId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

module.exports = {
  findCommentsByPostId,
  addComment,
  editComment,
  deleteComment,
};
