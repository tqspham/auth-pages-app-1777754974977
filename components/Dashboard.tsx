"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    router.push('/');
  };

  if (isAuthorized === null) {
    return <div className="text-gray-700">Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome! You are successfully logged in.</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
