import { User, Mail, Calendar, Shield, Edit } from 'lucide-react';

export default function ProfileSection({ user }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Information</h2>
        <button className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
          <Edit className="h-5 w-5" />
          <span className="text-sm font-medium">Edit Profile</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Card */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-2xl font-bold text-teal-600 dark:text-teal-300">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user.username}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member since {new Date(user.date_joined).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Account Status</p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Verified</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
                <p className="text-gray-900 dark:text-white font-medium">{user.username}</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              Account Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {new Date(user.date_joined).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Last Login</label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {new Date(user.last_login).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}