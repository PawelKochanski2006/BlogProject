import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CommentForm from './CommentForm.component';

const Comment = ({ comment, onReply, onDelete, postId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { user } = useAuth();
  const canDelete = user && (user.role === 'admin' || comment.userId === user.id);

  const handleReply = async (content) => {
    try {
      await onReply(content, comment.id);
      setShowReplyForm(false);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  return (
    <div className="py-2">
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{comment.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString('pl-PL')}
            </p>
          </div>
          {canDelete && (
            <button
              onClick={() => onDelete(comment.id)}
              className="text-red-500 hover:text-red-700"
            >
              Usuń
            </button>
          )}
        </div>
        <p className="mt-2 text-gray-700">{comment.content}</p>
        <div className="mt-2">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {showReplyForm ? 'Anuluj' : 'Odpowiedz'}
          </button>
        </div>
      </div>
      {showReplyForm && (
        <div className="mt-2">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCommentSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
