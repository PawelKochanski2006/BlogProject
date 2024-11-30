import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../services/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <img src={post.image} alt={post.title} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
