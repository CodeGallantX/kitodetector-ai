"use client";
import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { FaUpload, FaSpinner } from 'react-icons/fa';

const ImageScanner = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await api.post('/images/scan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during scanning');
    } finally {
      setIsLoading(false);
    }
  };

  const themeClasses = {
    container: theme === "dark" 
      ? "bg-gray-800 text-white" 
      : "bg-white text-gray-900",
    dropZone: theme === "dark"
      ? "border-gray-600 hover:border-teal-500"
      : "border-gray-300 hover:border-teal-400",
    button: theme === "dark"
      ? "bg-teal-600 hover:bg-teal-700"
      : "bg-teal-500 hover:bg-teal-600",
    result: theme === "dark"
      ? "bg-gray-700"
      : "bg-gray-50"
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${themeClasses.container}`}>
      <h2 className="text-2xl font-bold mb-6">Image Scanner</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${themeClasses.dropZone}`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                setPreview(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <FaUpload className="mx-auto text-4xl text-teal-500" />
            <p className="text-lg">Drag and drop an image here, or click to select</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, JPEG</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleScan}
        disabled={!selectedFile || isLoading}
        className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${themeClasses.button} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" />
            Scanning...
          </span>
        ) : (
          'Scan Image'
        )}
      </button>

      {result && (
        <div className={`mt-6 p-6 rounded-lg ${themeClasses.result}`}>
          <h3 className="text-xl font-semibold mb-4">Scan Results</h3>
          <div className="space-y-4">
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageScanner; 