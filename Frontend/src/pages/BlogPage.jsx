import React, { useState, useEffect, useCallback } from "react";
import ArticleCard from "../components/Posts/ArticleCard";
import Pagination from "../components/Posts/Pagination";
import SearchFilter from "../components/Posts/SearchFilter";

const BlogPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

    const fetchArticles = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3000/posts");
            if (!response.ok) {
                throw new Error("Failed to fetch articles");
            }
            const data = await response.json();
            setArticles(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    return (
        <>
          <SearchFilter />
          <div className="grid gap-8">
              {currentArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
              ))}
          </div>
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={setCurrentPage}
          />
        </>
    );
};

export default BlogPage;
