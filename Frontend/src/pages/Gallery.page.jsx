import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/common/Loading.component';
import AddImageModal from '../components/Gallery/AddImageModal.component';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();

  // Pobieranie kategorii
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/gallery/categories');
      // console.log('Kategorie:', response.data); // debugging
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Pobieranie zdjęć
  const fetchImages = async (category = 'all') => {
    try {
      setLoading(true);
      const url = category === 'all' 
        ? '/gallery'
        : `/gallery/category/${category}`;
      // console.log('Fetching images from:', url); // debugging
      const response = await apiClient.get(url);
      setImages(response.data);
    } catch (err) {
      setError('Nie udało się załadować galerii.');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchImages(selectedCategory);
  }, [selectedCategory]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtr kategorii */}
      <div className="mb-8">
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Wszystkie kategorie</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Siatka zdjęć */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(image => (
          <div
            key={image.image_id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.image_url}
              alt={image.alt_text}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Przycisk dodawania (sprawdzamy rolę) */}
      {user && user.role.id === 1 && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      )}

      {/* Modal dodawania zdjęć */}
      <AddImageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onImageAdded={() => {
          fetchImages(selectedCategory);
          setIsAddModalOpen(false);
        }}
      />

      {/* Przeglądarka zdjęć */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt_text}
              className="max-h-[90vh] w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
