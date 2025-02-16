import Link from 'next/link';
export default function Header() {
  return (
    <section className="flex flex-row items-center justify-between text-left py-40 bg-gray-900 min-h-screen px-4 md:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      <div>
      <h1 className="text-4xl sm:text-6xl font-bold mb-6 mt-4 text-white z-10 w-full max-w-md lg:max-w-2xl">
      Welcome to KitoDeck AI – Identify and Avoid Kito Predators
      </h1>
      <p className="text-xl sm:text-2xl mb-8 max-w-xl mx-auto text-white z-10 opacity-90">
      KitoDeck AI uses advanced AI to detect and prevent Kito threats, keeping you safe through smart analysis and real-time alerts.
      </p>
      <Link
        href="/auth/signup"
        className="bg-teal-500 px-8 py-3 rounded-full text-lg text-white transition transform hover:scale-105 z-10"
        >
        Sign Up for Free
      </Link>
        </div>
<div className="" ></div>
    </section>
  );
}
