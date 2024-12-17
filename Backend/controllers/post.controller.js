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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await postModel.findAllPosts(page, limit);
    res.json({
      posts: result.posts,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalPosts: result.totalPosts,
        postsPerPage: limit
      }
    });
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
  try {
    const postId = Number(req.params.postId);
    const userId = req.user.id; // Z middleware auth

    if (!postId || !userId) {
      return res.status(400).json({ 
        message: 'Brak wymaganych danych',
        required: { postId, userId }
      });
    }

    console.log('Adding like:', { postId, userId });

    const result = await postModel.addLikeToPost(postId, userId);
    res.status(200).json({ 
      message: 'Polubienie dodane',
      result 
    });
  } catch (err) {
    console.error('Error in addLike:', err);
    res.status(500).json({ message: err.message });
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
  try {
    const postId = Number(req.params.postId);
    const userId = req.user.id; // Z middleware auth

    if (!postId || !userId) {
      return res.status(400).json({ 
        message: 'Brak wymaganych danych',
        required: { postId, userId }
      });
    }

    console.log('Removing like:', { postId, userId });

    const result = await postModel.removeLikeFromPost(postId, userId);
    res.status(200).json({ 
      message: 'Polubienie usunięte',
      result 
    });
  } catch (err) {
    console.error('Error in removeLike:', err);
    res.status(500).json({ message: err.message });
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

/**
 * Nowa funkcja do sprawdzania statusu polubienia
 * @param {Object} req - Obiekt żądania
 * @param {Object} res - Obiekt odpowiedzi
 */
const checkLikeStatus = async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const userId = req.user.id;

    if (!postId || !userId) {
      return res.status(400).json({ 
        message: 'Brak wymaganych danych',
        required: { postId, userId }
      });
    }

    const isLiked = await postModel.checkIfUserLikedPost(postId, userId);
    res.json({ isLiked });
  } catch (err) {
    console.error('Error in checkLikeStatus:', err);
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
  checkLikeStatus
};
