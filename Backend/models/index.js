const Post = require('./Post');
const Comment = require('./Comment');
const Gallery = require('./Gallery');

// Relacje (jeśli istnieją):
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { Post, Comment, Gallery };
