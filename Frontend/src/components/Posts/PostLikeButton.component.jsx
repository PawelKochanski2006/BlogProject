import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PostLikeButton = ({ postId, likesCount, isLiked, onLikeClick }) => {
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      onLikeClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isAuthenticated}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
        ${isAuthenticated ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed opacity-50'}
        ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
    >
      <span className="text-2xl">{isLiked ? '❤️' : '🤍'}</span>
      <span>{likesCount} polubień</span>
      {!isAuthenticated && (
        <span className="text-sm text-gray-500">(Zaloguj się, aby polubić)</span>
      )}
    </button>
  );
};

export default PostLikeButton;
