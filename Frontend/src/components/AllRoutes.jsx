import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
// import LoginForm from '../pages/LoginForm'
// import BlogPage from '../pages/BlogPage'
// import GalleryPage from '../pages/GalleryPage'
import NotFound from '../pages/NotFound'
import PostDetailsPage from '../pages/PostDetailsPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'


const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AllRoutes
