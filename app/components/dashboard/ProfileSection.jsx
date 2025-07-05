export default function ProfileSection({ user }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Your Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
          <p className="mt-1 text-gray-900 dark:text-white">{user.username}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
          <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</label>
          <p className="mt-1 text-gray-900 dark:text-white">
            {new Date(user.date_joined).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}