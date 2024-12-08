const likeModel = require('../models/like.model');

const likePost = async (req, res) => {
  const { post_id, user_id } = req.body;

  try {
    const result = await likeModel.likePost(post_id, user_id);
    res.status(201).json({ message: 'Post liked', likeId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const dislikePost = async (req, res) => {
  const { post_id, user_id } = req.body;

  try {
    await likeModel.dislikePost(post_id, user_id);
    res.json({ message: 'Post disliked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostLikesCount = async (req, res) => {
  const { post_id } = req.params;

  try {
    const likesCount = await likeModel.getPostLikesCount(post_id);
    res.json({ likesCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  likePost,
  dislikePost,
  getPostLikesCount
};
