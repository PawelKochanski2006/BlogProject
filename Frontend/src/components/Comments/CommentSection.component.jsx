import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../../api/apiClient';
import CommentList from './CommentList.component';
import CommentForm from './CommentForm.component';
import { useAuth } from '../../contexts/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const fetchComments = useCallback(async () => {
    try {
      const response = await apiClient.get(`/comments/${postId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Nie udało się załadować komentarzy.');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async (content, parentId = null) => {
    if (!user) return;

    try {
      const commentData = {
        postId: Number(postId),
        userId: user.id,
        content: content,
        parentCommentId: parentId ? Number(parentId) : null,
      };

      console.log('Sending comment data:', commentData);

      const response = await apiClient.post('/comments', commentData);
      console.log('Response from server:', response.data);

      if (response.status === 201) {
        await fetchComments();
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      if (err.response) {
        console.error('Server error details:', err.response.data);
      }
      setError('Nie udało się dodać komentarza.');
      throw err;
    }
  };

  const handleDeleteComment = async commentId => {
    try {
      await apiClient.delete(`/comments/${commentId}`);
      await fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Nie udało się usunąć komentarza.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  const mappedComments = comments.map(comment => ({
    id: comment.comment_id,
    content: comment.comment_content,
    username: comment.author,
    created_at: comment.created_at,
    parent_comment_id: comment.parent_comment_id,
    userId: comment.user_id,
  }));

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Komentarze ({comments.length})</h2>

      {isAuthenticated ? (
        <div className="mb-8">
          <CommentForm
            postId={postId}
            onCommentSubmit={content => handleCommentSubmit(content, null)}
          />
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
          <p>Zaloguj się, aby dodać komentarz</p>
        </div>
      )}

      <CommentList
        comments={mappedComments}
        postId={postId}
        onCommentSubmit={handleCommentSubmit}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default CommentSection;
