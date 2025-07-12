const Navigation = ({ activeTab, setActiveTab, onSignOut }) => {
  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'image-scan', name: 'Image Scan', icon: '🖼️' },
    { id: 'chat-scan', name: 'Chat Scan', icon: '💬' },
  ];

  return (
    <nav className="w-full">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
                ${activeTab === tab.id 
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={onSignOut}
            className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
              text-gray-700 hover:bg-red-100 hover:text-red-700 dark:text-gray-300 dark:hover:bg-red-900 dark:hover:text-red-100"
          >
            <span className="text-lg">🚪</span>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;