import { useEffect, useState } from "react";
import { fetchPosts } from "../../services/api";

// /src/components/Posts/PostList.jsx
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-md overflow-hidden"
        >
          <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.date}</p>
            <a
              href={`/posts/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              Czytaj więcej
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
