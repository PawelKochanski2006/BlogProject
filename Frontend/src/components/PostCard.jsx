import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img className="w-full h-48 object-cover" src={post.thumbnail} alt={post.title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {post.description.substring(0, 100)}...
        </p>
        <Link
          to={`/posts/${post.post_id}`}
          className="block mt-4 text-indigo-500 hover:text-indigo-600 font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
