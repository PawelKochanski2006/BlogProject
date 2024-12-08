const db = require('../config/db.config');

// Function to display all posts with thumbnail, category, comments count, likes, and views
const findAllPosts = () => {
  return new Promise((resolve, reject) => {
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
                  p.created_at DESC;
    `, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Function to display post details
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
                p.id, p.title, p.description, p.read_time, p.views, p.likes_count, p.image_url, cat.name;
    `, [postId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

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

const incrementPostViews = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE posts SET views = views + 1 WHERE id = ?', [postId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Function to update post details
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

// Function to delete a post along with related comments, likes, images, and tags
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
  incrementPostViews,
  editPost,
  deletePostById,
};
