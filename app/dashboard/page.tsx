import { Dashboard } from '@/components/Dashboard';
import { Navigation } from '@/components/Navigation';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="flex items-center justify-center px-4 py-20">
        <Dashboard />
      </main>
    </div>
  );
}
