// /src/pages/Home.jsx
import React from "react";
import PostList from "../components/Posts/PostList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">Mój Blog</h1>
        <p>Minimalistyczne inspiracje codziennego życia</p>
      </header>
      <main className="container mx-auto p-6">
        <PostList />
      </main>
      <footer className="bg-gray-800 text-gray-200 text-center py-4">
        © 2024 Mój Blog. Wszystkie prawa zastrzeżone.
      </footer>
    </div>
  );
};

export default Home;
