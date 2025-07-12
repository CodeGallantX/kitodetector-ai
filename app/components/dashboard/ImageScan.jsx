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
        'https://kitodeck-be-5cal.onrender.com/api/image-scan/',
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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Kito Image Scanner</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-teal-500 transition-colors">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {selectedFile ? selectedFile.name : 'Click to select an image'}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !selectedFile}
              className={`w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center
                ${(isLoading || !selectedFile) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </>
              ) : 'Scan Image'}
            </button>
          </form>

          {previewUrl && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Preview</h3>
              <div className="relative aspect-square">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          )}
        </div>

        {scanResult && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 h-fit sticky top-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Scan Results</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Safety Status</p>
                <p className={`text-lg font-semibold ${scanResult.is_safe ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {scanResult.is_safe ? 'Safe Content' : 'Potentially Harmful Content'}
                </p>
              </div>

              {scanResult.analysis && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Analysis</p>
                  <p className="text-gray-700 dark:text-gray-300">{scanResult.analysis}</p>
                </div>
              )}

              {scanResult.confidence && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Confidence Level</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div 
                        className="bg-teal-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.round(scanResult.confidence * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {Math.round(scanResult.confidence * 100)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}