const db = require('../config/db.config');

/**
 * Funkcja `createUser` wstawia nowego użytkownika do tabeli bazy danych z podanym username,
 * emailem i hashem hasła.
 * @param username - Parametr `username` to string, który reprezentuje nazwę użytkownika, który jest tworzony.
 * @param email - Email jest unikalnym identyfikatorem użytkownika i jest używany do komunikacji oraz weryfikacji konta.
 * @param password_hash - Parametr `password_hash` w funkcji `createUser` to zazwyczaj zahashowana wersja hasła
 * użytkownika. Przechowywanie zahashowanych haseł zamiast zwykłych tekstowych haseł jest powszechną praktyką
 * bezpieczeństwa w celu ochrony danych użytkownika w przypadku naruszenia danych. Algorytmy hashujące, takie jak
 * bcrypt, są często używane do bezpiecznego hashowania.
 * @returns Funkcja `createUser` zwraca Promise.
 */
const createUser  = (username, email, password_hash) => {
  return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, password_hash], (err, results) => {
          if (err) return reject(err);
          resolve(results);
      });
  });
};

/**
 * Finds a user by their username or email.
 *
 * @param {string} usernameOrEmail - The username or email of the user to find.
 * @returns {Promise<Object>} A promise that resolves to the user object if found, or null if not found.
 */
const findUserByUsernameOrEmail = (usernameOrEmail) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ? or email = ?', [usernameOrEmail, usernameOrEmail], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

/**
 * Funkcja `getAllUsersWithRoles` pobiera wszystkich użytkowników wraz z ich rolami z tabeli bazy danych i zwraca
 * promise z wynikami.
 * @returns Funkcja `getAllUsersWithRoles` zwraca Promise, które zapytuje bazę danych w celu pobrania informacji o
 * wszystkich użytkownikach wraz z ich rolami. Zapytanie wybiera ID użytkownika, nazwę użytkownika, email, nazwę roli
 * oraz datę utworzenia, a wyniki są sortowane według daty utworzenia użytkownika w kolejności malejącej. Jeśli nie
 * wystąpią błędy podczas wykonania zapytania, funkcja zwraca wyniki zapytania. Jeśli
 */
const getAllUsersWithRoles = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        u.id AS user_id,
        u.username,
        u.email,
        r.name AS role,
        u.created_at
      FROM
      JOIN
        roles r ON u.role_id = r.id
      ORDER BY
        u.created_at DESC
    `, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `getUserDetailsById` pobiera szczegóły użytkownika, w tym nazwę użytkownika, email, rolę, liczbę polubień i
 * liczbę komentarzy na podstawie ID użytkownika z bazy danych.
 * @param userId - Funkcja `getUserDetailsById` przyjmuje parametr `userId`, aby pobrać szczegóły użytkownika z bazy
 * danych na podstawie jego ID. Funkcja wykonuje zapytanie SQL w celu wybrania różnych szczegółów użytkownika, takich
 * jak ID użytkownika, nazwa użytkownika, email, rola, liczba polubień i liczba komentarzy związanych z użytkownikiem.
 * Zapytanie łączy
 * @returns Funkcja `getUserDetailsById` zwraca Promise, które zapytuje bazę danych w celu pobrania szczegółów
 * użytkownika określonego przez jego `userId`. Zapytanie wybiera ID użytkownika, nazwę użytkownika, email, nazwę roli,
 * liczbę polubień i liczbę komentarzy związanych z użytkownikiem. Funkcja zwraca szczegóły użytkownika, jeśli
 * zapytanie zakończy się sukcesem, lub zwraca błąd, jeśli wystąpi błąd podczas zapytania.
 */
const getUserDetailsById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        u.id AS user_id,
        u.username,
        u.email,
        r.name AS role,
        COUNT(DISTINCT pl.id) AS likes_count,
        COUNT(DISTINCT c.id) AS comments_count
      FROM
        users u
      LEFT JOIN
        post_likes pl ON u.id = pl.user_id
      LEFT JOIN
        comments c ON u.id = c.user_id
      JOIN
        roles r ON u.role_id = r.id
      WHERE
        u.id = ?
      GROUP BY
        u.id, u.username, u.email, r.name
    `, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

/**
 * Funkcja `getUserLikedPosts` pobiera posty polubione przez konkretnego użytkownika z bazy danych i zwraca je w
 * kolejności malejącej na podstawie daty utworzenia.
 * @param userId - Funkcja `getUserLikedPosts` przyjmuje parametr `userId` jako dane wejściowe. Ten parametr jest
 * używany do zapytania bazy danych o posty, które polubił konkretny użytkownik.
 * @returns Funkcja `getUserLikedPosts` zwraca Promise, które zapytuje bazę danych w celu pobrania informacji o
 * postach, które polubił konkretny użytkownik. Zapytanie wybiera ID posta, tytuł, opis, czas czytania, liczbę
 * wyświetleń, liczbę polubień i datę utworzenia postów, które polubił użytkownik. Wyniki są sortowane według daty
 * utworzenia w kolejności malejącej. Jeśli nie wystąpią błędy podczas zapytania do bazy danych,
 */
const getUserLikedPosts = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        p.id AS post_id,
        p.title,
        p.description,
        p.read_time,
        p.views,
        p.likes_count,
        p.created_at
      FROM
        posts p
      JOIN
        post_likes pl ON p.id = pl.post_id
      WHERE
        pl.user_id = ?
      ORDER BY
        p.created_at DESC
    `, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `getUserComments` pobiera komentarze napisane przez konkretnego użytkownika z bazy danych i zawiera
 * szczegóły takie jak ID komentarza, treść, data utworzenia, tytuł posta i ID nadrzędnego komentarza.
 * @param userId - Parametr `userId` w funkcji `getUserComments` jest używany do określenia ID użytkownika, dla którego
 * chcesz pobrać komentarze. Funkcja zapytuje bazę danych, aby pobrać komentarze napisane przez użytkownika o
 * określonym `userId`.
 * @returns Funkcja `getUserComments` zwraca Promise, które zapytuje bazę danych w celu pobrania komentarzy napisanych
 * przez konkretnego użytkownika. Zapytanie wybiera ID komentarza, treść, datę utworzenia, tytuł posta i ID nadrzędnego
 * komentarza dla komentarzy związanych z określonym ID użytkownika. Wyniki są sortowane według daty utworzenia w
 * kolejności malejącej. Jeśli nie wystąpią błędy podczas zapytania do bazy danych,
 */
const getUserComments = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        c.id AS comment_id,
        c.content,
        c.created_at,
        p.title AS post_title,
        c.parent_comment_id
      FROM
        comments c
      JOIN
        posts p ON c.post_id = p.id
      WHERE
        c.user_id = ?
      ORDER BY
        c.created_at DESC
    `, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `getUserGalleryImages` pobiera obrazy galerii użytkownika z bazy danych na podstawie ID użytkownika.
 * @param userId - Parametr `userId` jest używany do określenia użytkownika, dla którego chcesz pobrać obrazy galerii.
 * @returns Funkcja `getUserGalleryImages` zwraca Promise, które zwraca tablicę obrazów galerii należących do
 * konkretnego użytkownika. Tablica zawiera obiekty z właściwościami takimi jak `image_id`, `image_url`, `alt_text`,
 * `category` i `created_at`.
 */
const getUserGalleryImages = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        g.id AS image_id,
        g.image_url,
        g.alt_text,
        gc.name AS category,
        g.created_at
      FROM
        gallery g
      LEFT JOIN
        gallery_categories gc ON g.category_id = gc.id
      WHERE
        g.user_id = ?
      ORDER BY
        g.created_at DESC
    `, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `updateUserRole` aktualizuje rolę użytkownika w bazie danych za pomocą podejścia opartego na Promise.
 * @param userId - Parametr `userId` reprezentuje unikalny identyfikator użytkownika, którego rola jest aktualizowana.
 * @param newRoleId - Parametr `newRoleId` w funkcji `updateUserRole` reprezentuje nowy ID roli, który chcesz przypisać
 * użytkownikowi o określonym `userId`. Ta funkcja aktualizuje rolę użytkownika w bazie danych, ustawiając pole
 * `role_id` w tabeli `users` na podany
 * @returns Funkcja `updateUserRole` zwraca Promise.
 */
const updateUserRole = (userId, newRoleId) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE users SET role_id = ? WHERE id = ?', [newRoleId, userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `getRoleIdByName` pobiera ID roli z bazy danych na podstawie podanej nazwy roli.
 * @param roleName - Parametr `roleName` to string reprezentujący nazwę roli, dla której chcesz pobrać odpowiadający ID
 * roli z tabeli `roles`.
 * @returns Funkcja `getRoleIdByName` zwraca Promise, które zwraca ID roli pobrane z bazy danych na podstawie podanej
 * nazwy roli.
 */
const getRoleIdByName = (roleName) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM roles WHERE name = ?', [roleName], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].id);
    });
  });
};

/**
 * Funkcja `getAllUsersWithActivity` pobiera dane użytkowników wraz z ich aktywnością i informacjami o roli z bazy
 * danych.
 * @returns Funkcja `getAllUsersWithActivity` zwraca Promise, które zwraca tablicę obiektów reprezentujących
 * użytkowników z ich szczegółami aktywności, takimi jak user_id, username, email, rola, liczba polubień, liczba
 * komentarzy i znacznik czasu utworzenia. Użytkownicy są sortowani według daty utworzenia w kolejności malejącej.
 */
const getAllUsersWithActivity = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        u.id AS user_id,
        u.username,
        u.email,
        r.name AS role,
        COUNT(DISTINCT pl.id) AS likes_count,
        COUNT(DISTINCT c.id) AS comments_count,
        u.created_at
      FROM
        users u
      LEFT JOIN
        post_likes pl ON u.id = pl.user_id
      LEFT JOIN
        comments c ON u.id = c.user_id
      JOIN
        roles r ON u.role_id = r.id
      GROUP BY
        u.id, u.username, u.email, r.name, u.created_at
      ORDER BY
        u.created_at DESC
    `, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `getUserActivityForPost` pobiera szczegóły posta, polubienia i komentarze dla konkretnego użytkownika i
 * posta z bazy danych.
 * @param userId - Parametr `userId` reprezentuje ID użytkownika, dla którego chcesz pobrać aktywność związaną z
 * konkretnym postem.
 * @param postId - Parametr `postId` w funkcji `getUserActivityForPost` reprezentuje unikalny identyfikator posta, dla
 * którego chcesz pobrać aktywność użytkownika. Ta funkcja zapytuje bazę danych w celu pobrania informacji związanych z
 * określonym postem, takich jak tytuł posta, ID posta, ID polubienia (jeśli użytkownik polubił post), ID komentarza,
 * treść komentarza i znacznik czasu utworzenia komentarza. Zapytanie łączy tabele `posts`, `post_likes` i `comments`
 * na podstawie podanych parametrów.
 * @returns Funkcja `getUserActivityForPost` zwraca Promise, które zwraca wyniki zapytania do bazy danych w celu
 * pobrania informacji związanych z konkretnym postem, w tym tytuł posta, ID posta, ID polubienia (jeśli użytkownik
 * polubił post), ID komentarza, treść komentarza i znacznik czasu utworzenia komentarza. Zapytanie łączy tabele
 * `posts`, `post_likes` i `comments` na podstawie podanych parametrów.
 */
const getUserActivityForPost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        p.title AS post_title,
        p.id AS post_id,
        pl.id AS like_id,
        c.id AS comment_id,
        c.content AS comment_content,
        c.created_at AS comment_created_at
      FROM
        posts p
      LEFT JOIN
        post_likes pl ON p.id = pl.post_id AND pl.user_id = ?
      LEFT JOIN
        comments c ON p.id = c.post_id AND c.user_id = ?
      WHERE
        p.id = ?
      ORDER BY
        c.created_at
    `, [userId, userId, postId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `getUsersByRole` pobiera użytkowników na podstawie określonej nazwy roli z bazy danych i zwraca promise z
 * wynikami.
 * @param roleName - Parametr `roleName` reprezentuje nazwę roli, dla której chcesz pobrać użytkowników.
 * @returns Funkcja `getUsersByRole` zwraca Promise, które zwraca tablicę obiektów użytkowników, którzy pasują do
 * określonej nazwy roli. Każdy obiekt użytkownika zawiera ID użytkownika, nazwę użytkownika, email i datę utworzenia,
 * posortowane w kolejności malejącej według daty utworzenia.
 */
const getUsersByRole = (roleName) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        u.id AS user_id,
        u.username,
        u.email,
        u.created_at
      FROM
        users u
      JOIN
        roles r ON u.role_id = r.id
      WHERE
        r.name = ?
      ORDER BY
        u.created_at DESC
    `, [roleName], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Funkcja `deleteUser` usuwa użytkownika z bazy danych na podstawie jego ID użytkownika za pomocą Promise.
 * @param userId - Parametr `userId` w funkcji `deleteUser` reprezentuje unikalny identyfikator użytkownika, którego
 * chcesz usunąć z bazy danych. Ten parametr jest używany do określenia, który rekord użytkownika powinien zostać
 * usunięty z tabeli `users` na podstawie podanego `userId`.
 * @returns Funkcja `deleteUser` zwraca Promise.
 */
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  createUser,
  findUserByUsernameOrEmail,
  getAllUsersWithRoles,
  getUserDetailsById,
  getUserLikedPosts,
  getUserComments,
  getUserGalleryImages,
  updateUserRole,
  getRoleIdByName,
  getAllUsersWithActivity,
  getUserActivityForPost,
  getUsersByRole,
  deleteUser
};
