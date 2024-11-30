import React, { useState } from "react";
import { addComment } from "../../services/api";

const CommentForm = ({ postId, refreshComments }) => {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ ...formData, postId }).then(refreshComments);
    setFormData({ name: "", email: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Imię"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <textarea
        placeholder="Treść"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        required
      />
      <button type="submit">Dodaj komentarz</button>
    </form>
  );
};

export default CommentForm;
