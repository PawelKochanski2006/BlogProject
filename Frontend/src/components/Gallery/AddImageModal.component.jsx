import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/apiClient';

const AddImageModal = ({ isOpen, onClose, onImageAdded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    alt_text: '',
    category_id: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/gallery/categories');
      setCategories(response.data);
    } catch (err) {
      setError('Nie udało się pobrać kategorii');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Walidacja rozmiaru (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Plik nie może być większy niż 10MB');
        return;
      }

      // Walidacja typu pliku
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        setError('Dozwolone są tylko pliki JPG, PNG, GIF i WEBP');
        return;
      }

      // Tworzenie podglądu
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedFile(file);
      setError(null);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview('');
    setFormData({
      alt_text: '',
      category_id: ''
    });
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Wybierz plik do przesłania');
      return;
    }

    if (!formData.category_id) {
      setError('Wybierz kategorię');
      return;
    }

    if (!formData.alt_text.trim()) {
      setError('Dodaj opis alternatywny');
      return;
    }

    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append('image', selectedFile);
    formDataToSend.append('alt_text', formData.alt_text);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('user_id', user.id);

    try {
      const response = await apiClient.post('/gallery', formDataToSend, {
        headers: {
          'Accept': 'application/json',
        },
        timeout: 60000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      if (response.data) {
        onImageAdded(response.data);
        resetForm();
        onClose();
      }
    } catch (err) {
      console.error('Błąd podczas przesyłania:', err);
      setError(err.response?.data?.message || 'Błąd podczas przesyłania pliku');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Dodaj nowe zdjęcie</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wybierz zdjęcie
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              className="w-full mt-1"
            />
            {preview && (
              <img
                src={preview}
                alt="Podgląd"
                className="mt-2 max-h-40 object-contain"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Opis alternatywny
            </label>
            <input
              type="text"
              value={formData.alt_text}
              onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategoria
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
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

          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
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
