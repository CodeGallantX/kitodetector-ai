const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', name: 'Profile' },
    { id: 'image-scan', name: 'Image Scan' },
    { id: 'chat-scan', name: 'Chat Scan' }
  ];

  return (
    <nav className="w-full md:w-48">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors
                ${activeTab === tab.id 
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;