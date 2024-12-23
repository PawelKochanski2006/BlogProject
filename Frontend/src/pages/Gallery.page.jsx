import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import apiClient from '../api/apiClient';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/common/Loading.component';
import ErrorMessage from '../components/common/ErrorMessage.component';
import AddImageModal from '../components/Gallery/AddImageModal.component';
import ImageViewer from '../components/Gallery/ImageViewer.component';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();

  // Konfiguracja breakpointów dla Masonry
  const breakpointColumns = {
    default: 4, // Domyślnie 4 kolumny
    1280: 3,   // 3 kolumny poniżej 1280px
    1024: 3,   // 3 kolumny poniżej 1024px
    768: 2,    // 2 kolumny poniżej 768px
    640: 1     // 1 kolumna poniżej 640px
  };

  const fetchImages = async () => {
    try {
      const response = await apiClient.get('/gallery');
      setImages(response.data);
    } catch (err) {
      setError('Błąd podczas pobierania zdjęć');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/gallery/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  const handleImageAdded = (newImage) => {
    setImages(prevImages => [newImage, ...prevImages]);
  };

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => String(img.category_id) === String(selectedCategory));

  return (
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Wszystkie kategorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {user && user.role === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Dodaj zdjęcie
              </button>
            )}
          </div>

        {/* Gallery grid */}
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="mb-4 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text || 'Gallery image'}
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </Masonry>
        )}

      {/* Modal dodawania zdjęć */}
      {/* Przycisk dodawania */}
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
        onImageAdded={handleImageAdded}
        categories={categories}
      />

        {selectedImage && (
          <ImageViewer
            image={selectedImage}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}

        {/* Pusta galeria */}
        {!loading && !error && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Brak zdjęć w wybranej kategorii
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
