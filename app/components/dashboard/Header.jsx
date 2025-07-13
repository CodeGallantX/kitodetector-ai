import Link from 'next/link';

export default function Header({ user }) {
  const avatarLetter = user?.username?.charAt(0)?.toUpperCase() || 'U';
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
          KitoDeck
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline text-gray-700 dark:text-gray-300 text-sm md:text-base">
            Welcome, <span className="font-medium">{user.username}</span>
          </span>
          
          <div className="relative inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium">
            {avatarLetter}
            <span className="absolute top-0 right-0 block h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
          </div>
        </div>
      </div>
    </header>
  );
}