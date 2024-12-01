const Posts = require('./Posts');
const Comments = require('./Comments');
const Gallery = require('./Gallery');

// Relacje między tabelami:
Posts.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Posts, { foreignKey: 'postId' });

module.exports = { Posts, Comments, Gallery };
