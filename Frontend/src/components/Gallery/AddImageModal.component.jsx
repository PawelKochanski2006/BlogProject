import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const AddImageModal = ({ isOpen, onClose, onImageAdded, categories }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    alt_text: '',
    category_id: ''
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileSelect = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Proszę wybrać plik');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    const formDataToSend = new FormData();
    formDataToSend.append('image', selectedFile);
    formDataToSend.append('alt_text', formData.alt_text);
    formDataToSend.append('category_id', formData.category_id || null);

    try {
      const response = await apiClient.post('/gallery', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      if (response.data) {
        onImageAdded(response.data);
        setSelectedFile(null);
        setPreview('');
        setFormData({ alt_text: '', category_id: '' });
        onClose();
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        err.response?.data?.message ||
        'Wystąpił błąd podczas przesyłania pliku. Spróbuj ponownie.'
      );
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Dodaj nowe zdjęcie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wybierz plik
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis alternatywny
            </label>
            <input
              type="text"
              value={formData.alt_text}
              onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Wprowadź opis alternatywny"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoria
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="">Wybierz kategorię</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
            </div>
          )}

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

          {uploadProgress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className={`px-4 py-2 text-white rounded ${
                loading || !selectedFile
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Przesyłanie...' : 'Dodaj'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImageModal;
