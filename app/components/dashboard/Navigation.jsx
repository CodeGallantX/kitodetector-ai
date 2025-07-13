import { User, Image, MessageSquare, LogOut, Settings, HelpCircle } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, onSignOut }) => {
  const tabs = [
    { 
      id: 'profile', 
      name: 'Profile', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      id: 'image-scan', 
      name: 'Image Scan', 
      icon: <Image className="h-5 w-5" /> 
    },
    { 
      id: 'chat-scan', 
      name: 'Chat Scan', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Kitodeck</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Security Dashboard</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
                  ${activeTab === tab.id 
                    ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <span className={`${activeTab === tab.id ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            </li>
          ))}
        </ul>

      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onSignOut}
          className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
        >
          <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navigation;