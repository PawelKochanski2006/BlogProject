import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CommentForm from './CommentForm.component';

const CommentItem = ({ comment, replies, postId, onCommentSubmit, onDeleteComment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { user } = useAuth();

  const handleReplySubmit = async (content) => {
    await onCommentSubmit(content, comment.id);
    setShowReplyForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border-l-2 border-gray-200 pl-4 mb-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="font-semibold">{comment.username}</span>
            <span className="text-gray-500 text-sm ml-2">
              {formatDate(comment.created_at)}
            </span>
          </div>
          {user?.id === comment.user_id && (
            <button
              onClick={() => onDeleteComment(comment.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Usuń
            </button>
          )}
        </div>
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Odpowiedz
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2 ml-4">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCommentSubmit={handleReplySubmit}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-4 mt-2">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={[]}
              postId={postId}
              onCommentSubmit={onCommentSubmit}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem; 