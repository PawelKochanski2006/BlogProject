import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CommentForm = ({ postId, parentId = null, onCommentSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const { isAuthenticated, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    try {
      await onCommentSubmit(content, parentId);
      setContent('');
      if (onCancel) onCancel();
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p>Zaloguj się, aby dodać komentarz</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Napisz komentarz..."
        rows="3"
      />
      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Anuluj
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!content.trim()}
        >
          {parentId ? 'Odpowiedz' : 'Dodaj komentarz'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm; 