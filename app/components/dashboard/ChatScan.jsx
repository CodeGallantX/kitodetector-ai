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
        'https://kitodeck-be-5cal.onrender.com/api/chat-scan/',
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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Kito Chat Transcript Scan</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="chatText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Chat Text
              </label>
              <textarea
                id="chatText"
                rows={10}
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Paste chat transcript here..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !chatText.trim()}
              className={`w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center
                ${(isLoading || !chatText.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : 'Analyze Chat'}
            </button>
          </form>
        </div>

        {scanResult && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 h-fit sticky top-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Analysis Results</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Safety Status</p>
                <p className={`text-lg font-semibold ${scanResult.is_safe ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {scanResult.is_safe ? 'Safe Conversation' : 'Potentially Harmful Content'}
                </p>
              </div>

              {scanResult.flagged_messages && scanResult.flagged_messages.length > 0 && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Flagged Messages ({scanResult.flagged_messages.length})</p>
                  <div className="mt-2 space-y-3 max-h-60 overflow-y-auto pr-2">
                    {scanResult.flagged_messages.map((msg, index) => (
                      <div key={index} className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-100 dark:border-red-800">
                        <p className="text-red-700 dark:text-red-300">{msg.message}</p>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">Reason: {msg.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {scanResult.overall_sentiment && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Sentiment</p>
                  <p className="text-gray-700 dark:text-gray-300 capitalize">{scanResult.overall_sentiment}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}