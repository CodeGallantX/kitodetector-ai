import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ChatScan() {
  const [chatText, setChatText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chatText.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        'https://kitodeck-be-5cal.onrender.com/api/safety/analyze-message/',
        { text: chatText },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setScanResult(response.data);
      toast.success('Chat analyzed successfully');
    } catch (error) {
      console.error('Chat scan error:', error);
      toast.error(error.response?.data?.detail || 'Failed to analyze chat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Chat Transcript Scan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="chatText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Chat Text
          </label>
          <textarea
            id="chatText"
            rows={6}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-teal-500 focus:border-teal-500
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            placeholder="Paste chat transcript here..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !chatText.trim()}
          className={`px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors
            ${(isLoading || !chatText.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Chat'}
        </button>
      </form>

      {scanResult && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Analysis Results</h3>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Is Safe:</span> {scanResult.is_safe ? 'Yes' : 'No'}
            </p>
            {scanResult.flagged_messages && scanResult.flagged_messages.length > 0 && (
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Flagged Messages:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {scanResult.flagged_messages.map((msg, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {msg.message} (Reason: {msg.reason})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {scanResult.overall_sentiment && (
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Overall Sentiment:</span> {scanResult.overall_sentiment}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}