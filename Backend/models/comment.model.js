const db = require('../config/db.config');

/**
 * The function `findCommentsByPostId` retrieves comments for a specific post ID from a database and
 * includes details such as comment ID, content, author, and creation date.
 * @param post_id - The `post_id` parameter is used to specify the ID of the post for which you want to
 * find comments. The function `findCommentsByPostId` takes this `post_id` as input and retrieves
 * comments associated with that particular post from the database.
 * @returns The `findCommentsByPostId` function returns a Promise that queries the database to retrieve
 * comments related to a specific post ID. The query selects the comment ID, content, creation date,
 * author's username, and parent comment ID from the comments table, joining with the users table to
 * get the author's username. The comments are filtered based on the post ID provided and are ordered
 * by their creation date
 */
const findCommentsByPostId = (post_id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT
                    c.id AS comment_id,
                    c.content,
                    c.created_at,
                    u.username AS author,
                    c.parent_comment_id
                FROM
                    comments c
                JOIN
                    users u ON c.user_id = u.id
                WHERE
                    c.post_id = ?
                ORDER BY
                    c.created_at;
      `, [post_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
};

// TODO: Add a documentation comment here
const addComment = (post_id, user_id, content) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO comments (post_id, user_id, parent_comment_id, content)
              VALUES (?, ?, ?, ?);
    `, [post_id, user_id, content], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
    findCommentsByPostId,
    addComment,
};
