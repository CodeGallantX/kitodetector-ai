import Link from 'next/link';

export default function Header({ user, onSignOut }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400">
          KitoDeck
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">
            Welcome, {user.username}
          </span>
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}