// src/pages/PostDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import CommentSection from '../components/CommentSection';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    apiClient.get(`/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {post ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <img className="w-full h-64 object-cover mt-4 rounded-lg" src={post.main_image} alt={post.title} />
          <p className="mt-6 text-gray-700 leading-relaxed">{post.description}</p>
          <CommentSection postId={id} />
        </>
      ) : (
        <p className="text-center text-gray-500">Loading post...</p>
      )}
    </div>
  );
};

export default PostDetailsPage;
