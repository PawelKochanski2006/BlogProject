import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.page';
import GalleryPage from '../pages/Gallery.page';
import NotFound from '../pages/NotFound.page';
import PostDetailsPage from '../pages/PostDetails.page';
import RegisterPage from '../pages/Register.page';
import LoginPage from '../pages/Login.page';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetailsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
