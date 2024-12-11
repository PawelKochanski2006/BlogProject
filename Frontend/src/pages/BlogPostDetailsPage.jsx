import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CommentSection from '../components/CommentSection';
import RecentPostsGrid from '../components/RecentPostsGrid';
import InteractionButtons from '../components/InteractionButtons';
import { fetchPosts, fetchComments } from '../utils/api';

const BlogPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setRecentPosts(fetchedPosts.slice(0, 4));

      // Fetch comments for the first post as an example
      if (fetchedPosts.length > 0) {
        const fetchedComments = await fetchComments(fetchedPosts[0].id);
        setComments(fetchedComments);
      }
    };

    loadData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-md">
      <Header />
      <main className="py-8">
        {posts.map(post => (
          <div key={post.id}>
            <div className="text-sm text-gray-500 mb-4">{post.created_at}</div>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <img src={post.imageUrl} alt={post.title} className="w-full mb-4"/>
            <p className="mb-4">{post.description}</p>
            <div className="flex justify-between items-center py-4 border-t">
              <div className="text-gray-500">1.2K views · 30 comments</div>
              <InteractionButtons />
            </div>
            <CommentSection comments={comments} />
          </div>
        ))}
        <RecentPostsGrid posts={recentPosts} />
      </main>
    </div>
  );
};

export default BlogPostPage;
