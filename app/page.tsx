import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome</h1>
          <p className="text-xl text-gray-600 mb-8">
            Authentication is secure and straightforward. Create an account or log in to access your dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
