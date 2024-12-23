import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageViewer = ({ image, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Dodaj nasłuchiwanie klawisza po zamontowaniu komponentu
    document.addEventListener('keydown', handleEscapeKey);

    // Usuń nasłuchiwanie po odmontowaniu komponentu
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Zblurowane tło */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/30"
            onClick={onClose}
          />

          {/* Kontener zdjęcia */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 max-w-[90vw] max-h-[90vh]"
          >
            {/* Przycisk zamknięcia */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
            >
              ×
            </button>

            {/* Zdjęcie */}
            <img
              src={image.image_url.replace('/thumbnails/', '/full/')}
              alt={image.alt_text}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Informacje o zdjęciu */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
              <p className="font-medium">{image.category}</p>
              <p className="text-sm opacity-75">Dodane przez: {image.uploaded_by}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageViewer;
