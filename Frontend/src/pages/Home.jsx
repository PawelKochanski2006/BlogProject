import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiClient.get('/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
