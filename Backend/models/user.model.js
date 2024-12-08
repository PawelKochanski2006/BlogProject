const db = require('../config/db.config');

// Funkcja do dodawania nowego użytkownika
const createUser  = (username, email, password_hash) => {
  return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, password_hash], (err, results) => {
          if (err) return reject(err);
          resolve(results);
      });
  });
};

// Funkcja do znajdowania użytkownika po nazwie oraz emailu użytkownika
const findUserByUsernameOrEmail = (username, email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ? or email = ?', [username, email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

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

const updateUserRole = (userId, newRoleId) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE users SET role_id = ? WHERE id = ?', [newRoleId, userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getRoleIdByName = (roleName) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM roles WHERE name = ?', [roleName], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].id);
    });
  });
};

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
