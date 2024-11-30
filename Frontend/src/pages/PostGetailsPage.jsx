import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostDetails, fetchComments } from "../services/api";
import CommentForm from "../components/Comments/CommentForm";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPostDetails(id).then(setPost);
    refreshComments();
  }, [id]);

  const refreshComments = () => {
    fetchComments(id).then(setComments);
  };

  if (!post) return <p>Ładowanie...</p>;

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <img src={post.image} alt={post.title} />
      <p>{post.content}</p>

      {/* Galeria */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="gallery">
          {post.gallery.map((image, index) => (
            <img key={index} src={image} alt={`Gallery ${index}`} />
          ))}
        </div>
      )}

      {/* Sekcja komentarzy */}
      <div className="comments-section">
        <h2>Komentarze</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.name}</strong>: {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p>Brak komentarzy.</p>
        )}
        <CommentForm postId={id} refreshComments={refreshComments} />
      </div>
    </div>
  );
};

export default PostDetailsPage;
