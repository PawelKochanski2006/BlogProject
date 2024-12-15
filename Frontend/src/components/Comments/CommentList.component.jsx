import React from 'react';
import Comment from './Comment.component';

const CommentList = ({ comments, postId, onCommentSubmit, onDeleteComment }) => {
  // Funkcja do budowania drzewa komentarzy
  const buildCommentTree = (comments) => {
    const commentMap = new Map();
    const roots = [];

    // Najpierw tworzymy mapę wszystkich komentarzy
    comments.forEach(comment => {
      commentMap.set(comment.id, {
        ...comment,
        children: []
      });
    });

    // Następnie budujemy drzewo
    comments.forEach(comment => {
      const commentWithChildren = commentMap.get(comment.id);
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id);
        if (parent) {
          parent.children.push(commentWithChildren);
        } else {
          // Jeśli nie znaleziono rodzica, dodaj jako komentarz główny
          roots.push(commentWithChildren);
        }
      } else {
        roots.push(commentWithChildren);
      }
    });

    return roots;
  };

  // Rekurencyjna funkcja renderująca komentarze
  const renderCommentTree = (comment, depth = 0) => {
    return (
      <div 
        key={comment.id} 
        className={`relative ${depth > 0 ? 'ml-4 md:ml-8' : ''}`}
      >
        <div className={`relative ${depth > 0 ? 'border-l-2 border-gray-200 pl-4' : ''}`}>
          <Comment
            comment={comment}
            postId={postId}
            onReply={onCommentSubmit}
            onDelete={onDeleteComment}
          />
          {comment.children && comment.children.length > 0 && (
            <div className="mt-2">
              {comment.children.map(child => renderCommentTree(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Budujemy drzewo komentarzy
  const commentTree = buildCommentTree(comments);

  // Sortujemy komentarze główne według daty (najnowsze pierwsze)
  const sortedRoots = [...commentTree].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="space-y-4">
      {sortedRoots.map(comment => renderCommentTree(comment))}
    </div>
  );
};

export default CommentList; 