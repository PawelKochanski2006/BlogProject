import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-[420px] flex flex-col">
      {/* Kontener na obrazek ze stałą wysokością i proporcją 16:9 */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={post.thumbnail}
          alt={post.title}
          onError={(e) => {
            e.target.src = '/default-thumbnail.jpg';
            e.target.onerror = null;
          }}
        />
      </div>

      {/* Kontener na treść */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Nagłówek z tytułem i datą */}
        <div className="flex justify-between items-start mb-2">
          {/* Tytuł */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 pr-4">
            {post.title}
          </h3>
          
          {/* Data utworzenia */}
          <div className="text-xs text-gray-600 whitespace-nowrap">
            {new Date(post.created_at).toLocaleDateString('pl-PL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Opis */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {post.description}
        </p>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Statystyki i przycisk Read More */}
        <div className="mt-3">
          {/* Statystyki */}
          <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
            <div className="flex items-center">
              <span className="mr-1">👁️</span>
              <span>{post.views || 0}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">💬</span>
              <span>{post.comments_count || 0}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">❤️</span>
              <span>{post.likes_count || 0}</span>
            </div>
          </div>

          {/* Link do szczegółów */}
          <Link
            to={`/posts/${post.post_id}`}
            className="block w-full text-center py-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors duration-200"
          >
            Czytaj więcej
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;