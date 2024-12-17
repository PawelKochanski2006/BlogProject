import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/apiClient';

const AddImageModal = ({ isOpen, onClose, onImageAdded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

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
      if (file.size > 5 * 1024 * 1024) {
        setError('Plik nie może być większy niż 5MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Dozwolone są tylko pliki JPG, PNG i GIF');
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
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
      // debugging
      console.log('Rozpoczynam wysyłanie pliku...');
      console.log('Rozmiar pliku:', selectedFile.size);
      console.log('Typ pliku:', selectedFile.type);

      const response = await apiClient.post('/gallery', formDataToSend, {
        headers: {
          'Accept': 'application/json',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Postęp wysyłania:', percentCompleted + '%');
        }
      });

      console.log('Odpowiedź z serwera:', response.data); // debugging
      
      if (response.data) {
        onImageAdded(response.data);
        onClose();
      }
    } catch (err) {
      console.error('Błąd podczas przesyłania:', err);
      setError(
        err.message || 
        'Błąd podczas przesyłania pliku. Spróbuj ponownie.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Dodaj nowe zdjęcie</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wybierz zdjęcie
            </label>
            <input
              type="file"
              accept="image/*"
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

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
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
