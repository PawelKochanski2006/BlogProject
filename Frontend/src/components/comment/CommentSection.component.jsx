// src/components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    apiClient
      .get(`/comments/${postId}`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
      <div className="mt-4 space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
            <strong className="block text-gray-800">{comment.name}</strong>
            <p className="mt-2 text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
