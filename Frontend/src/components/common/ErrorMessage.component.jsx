import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-500 text-center">{message}</div>
    </div>
  );
};

export default ErrorMessage;
