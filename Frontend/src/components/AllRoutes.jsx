import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
// import LoginForm from '../pages/LoginForm'
import BlogPage from '../pages/BlogPage'
// import GalleryPage from '../pages/GalleryPage'
import NotFound from '../pages/NotFound'


const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        {/* <Route path="/gallery" element={<GalleryPage />} /> */}
        {/* <Route path="/login" element={<LoginForm />} /> */}
        {/* <Route path='/register' element={<RegisterForm />}> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AllRoutes
