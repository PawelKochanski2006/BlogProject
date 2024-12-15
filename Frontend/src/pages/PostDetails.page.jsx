import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import CommentSection from '../components/Comments/CommentSection.component';
import PostLikeButton from '../components/Posts/PostLikeButton.component';
import Loading from '../components/common/Loading.component';
import { useAuth } from '../contexts/AuthContext';

const PostDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // Funkcja formatująca datę
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Pobieranie szczegółów posta
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await apiClient.get(`/posts/${id}`);
        const postData = response.data;

        setPost(postData);
        await apiClient.post(`/posts/${id}/views`);
      } catch (err) {
        setError('Nie udało się załadować szczegółów posta.');
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Sprawdzanie statusu polubienia
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (isAuthenticated) {
        try {
          const response = await apiClient.get(`/posts/${id}/like-status`);
          setIsLiked(response.data.isLiked);
        } catch (err) {
          console.error('Error checking like status:', err);
        }
      }
    };

    checkLikeStatus();
  }, [id, isAuthenticated]);

  // Obsługa polubień
  const handleLikeClick = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await apiClient.post(`/posts/${id}/like`);
      setPost(prev => ({
        ...prev,
        likes_count: response.data.likes_count,
      }));
      setIsLiked(response.data.isLiked);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Post nie został znaleziony.</div>
      </div>
    );
  }

  // Definicje zmiennych przed renderowaniem
  const tags = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];
  const additionalImages = post.additional_images
    ? post.additional_images.split(',').map(img => img.trim())
    : [];

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <div className="flex items-center text-gray-600 text-sm space-x-4">
              <span>Autor: {post.author}</span>
              <span>•</span>
              <span>Kategoria: {post.category}</span>
              {post.read_time && (
                <>
                  <span>•</span>
                  <span>Czas czytania: {post.read_time} min</span>
                </>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Data utworzenia: {post.created_at ? formatDate(post.created_at) : 'Brak daty'}
          </div>
        </div>

        {/* Statystyki */}
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">👁️</span>
            <span>{post.views || 0} wyświetleń</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💬</span>
            <span>{post.comments_count || 0} komentarzy</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">❤️</span>
            <span>{post.likes_count || 0} polubień</span>
          </div>
        </div>
      </header>

      {/* Główny obraz */}
      {post.main_image && (
        <div className="mb-8">
          <img
            src={post.main_image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Treść posta */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">{post.description}</p>
      </div>

      {/* Tagi */}
      {tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tagi:</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dodatkowe zdjęcia */}
      {additionalImages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Galeria:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalImages.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <img
                  src={image}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sekcja polubień */}
      <div className="my-8">
        <PostLikeButton
          postId={id}
          likesCount={post.likes_count}
          isLiked={isLiked}
          onLikeClick={handleLikeClick}
        />
      </div>

      {/* Sekcja komentarzy */}
      <CommentSection postId={id} />
    </article>
  );
};

export default PostDetails;