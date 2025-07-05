import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ImageScan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setScanResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        'https://kitodeck-be-5cal.onrender.com/api/safety/scan-image/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setScanResult(response.data);
      toast.success('Image scanned successfully');
    } catch (error) {
      console.error('Image scan error:', error);
      toast.error(error.response?.data?.detail || 'Failed to scan image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Image Scan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-100
              dark:file:bg-gray-700 dark:file:text-teal-300
              dark:hover:file:bg-gray-600"
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h3>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-w-full h-auto max-h-64 rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !selectedFile}
          className={`px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors
            ${(isLoading || !selectedFile) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Scanning...' : 'Scan Image'}
        </button>
      </form>

      {scanResult && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Scan Results</h3>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Is Safe:</span> {scanResult.is_safe ? 'Yes' : 'No'}
            </p>
            {scanResult.analysis && (
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Analysis:</span> {scanResult.analysis}
              </p>
            )}
            {scanResult.confidence && (
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Confidence:</span> {Math.round(scanResult.confidence * 100)}%
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}