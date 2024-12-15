import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import PostCard from '../components/post/PostCard.component';
import Loading from '../components/common/Loading.component';

const POSTS_PER_PAGE = 12;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`);
        console.log('API Response:', response.data);

        setPosts(response.data.posts);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Nie udało się pobrać postów. Spróbuj ponownie później.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Najnowsze Posty</h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          {posts.length === 0 ? (
            <p className="text-center text-gray-600">Brak dostępnych postów</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {posts.map(post => (
                <PostCard key={post.post_id} post={post} />
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <nav className="flex justify-center mt-8 px-4">
              <ul className="flex items-center space-x-4">
                <li>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md text-white ${
                      currentPage === 1
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    Poprzednia
                  </button>
                </li>

                <li className="text-gray-600">
                  Strona {currentPage} z {totalPages}
                </li>

                <li>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md text-white ${
                      currentPage === totalPages
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    Następna
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
