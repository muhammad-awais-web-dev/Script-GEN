import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Generating..." }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-400"></div>
    <p className="mt-4 text-lg text-teal-300">{message}</p>
    <p className="text-sm text-gray-500">This may take a moment.</p>
  </div>
);