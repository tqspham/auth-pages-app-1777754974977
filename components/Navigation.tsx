import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AuthApp
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-blue-600 transition">
            Sign Up
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
            Log In
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
