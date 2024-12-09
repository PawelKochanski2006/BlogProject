const postModel = require('../models/post.model');

/**
 * Funkcja do dodawania nowego posta
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const addPost = async (req, res) => {
  const { title, description, categoryId } = req.body;
  const created_by = req.user.id;

  try {
    const result = await postModel.createPost(title, description, categoryId, created_by);
    res.status(201).json({ message: 'Post added', postId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do pobierania wszystkich postów
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do pobierania posta po ID
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findPostDetails(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * The `addLike` function asynchronously adds a like to a post and sends a response with the result.
 * @param req - The `req` parameter in the `addLike` function typically represents the HTTP request
 * object, which contains information about the incoming request from the client, such as headers,
 * parameters, body, etc. In this specific context, `req.body` is used to access the data sent in the
 * request body
 * @param res - The `res` parameter in the `addLike` function is the response object that will be used
 * to send a response back to the client making the request. It is typically used to set the status
 * code and send data back in the response.
 */
const addLike = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const result = await addLikeToPost(postId, userId);
    res.status(200).json({ message: 'Like added successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * The function `removeLike` asynchronously removes a like from a post based on the provided postId and
 * userId.
 * @param req - The `req` parameter in the `removeLike` function typically represents the request
 * object in an Express route handler. It contains information about the incoming HTTP request such as
 * headers, parameters, body, etc. In this case, the `req` object is expected to have a `body` property
 * which
 * @param res - The `res` parameter in the `removeLike` function is the response object that will be
 * used to send a response back to the client making the request. It is typically an instance of the
 * Express response object in Node.js applications. The response object allows you to send HTTP
 * responses with data such as
 */
const removeLike = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const result = await removeLikeFromPost(postId, userId);
    res.status(200).json({ message: 'Like removed successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Funkcja do zwiększania liczby wyświetleń posta
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const incrementPostViews = async (req, res) => {
  const { postId } = req.params;

  try {
    await postModel.incrementPostViews(postId);
    res.status(200).json({ message: 'Post views incremented' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do edytowania posta
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const editPost = async (req, res) => {
  const { postId } = req.params;
  const { title, description, imageUrl, additionalImages } = req.body;

  try {
    await postModel.editPost(postId, title, description, imageUrl, additionalImages);
    res.status(200).json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Funkcja do usuwania posta po ID
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const deletePostById = async (req, res) => {
  const { postId } = req.params;

  try {
    await postModel.deletePostById(postId);
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  addLike,
  removeLike,
  incrementPostViews,
  editPost,
  deletePostById,
};
