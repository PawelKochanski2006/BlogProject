import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/apiClient';

const AddImageModal = ({ isOpen, onClose, onImageAdded }) => {
  const [formData, setFormData] = useState({
    alt_text: '',
    category_id: '',
    image: null
  });
  const [preview, setPreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/gallery/categories');
      setCategories(response.data);
    } catch (err) {
      setError('Nie udało się pobrać kategorii');
      console.error('Error fetching categories:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Plik jest zbyt duży. Maksymalny rozmiar to 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.image) {
      setError('Proszę wybrać plik');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
      formDataToSend.append('alt_text', formData.alt_text);
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('user_id', user.id);

      const response = await apiClient.post('/gallery', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('upload progress:', percentCompleted);
        }
      });

      if (response.data) {
        onImageAdded(response.data);
        onClose();
      } else {
        throw new Error('Brak odpowiedzi z serwera');
      }
    } catch (err) {
      console.error('Error adding image:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Nie udało się dodać zdjęcia'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Dodaj nowe zdjęcie</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pole wyboru pliku */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wybierz zdjęcie
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Podgląd"
                className="mt-2 max-h-40 object-contain"
              />
            )}
          </div>

          {/* Pole opisu alternatywnego */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Opis alternatywny
            </label>
            <input
              type="text"
              value={formData.alt_text}
              onChange={e => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Wybór kategorii */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategoria
            </label>
            <select
              value={formData.category_id}
              onChange={e => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Wybierz kategorię</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Dodawanie...' : 'Dodaj zdjęcie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImageModal;
