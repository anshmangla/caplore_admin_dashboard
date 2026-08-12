export const dynamic = 'force-dynamic';

import { getUsers } from './actions';
import UserDashboard from './components/UserDashboard';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-8 font-sans bg-gray-50 text-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">App User Management</h1>
            <p className="text-gray-600">Manage registered users, reset passwords, and edit details.</p>
          </div>
        </div>
        
        <UserDashboard initialUsers={users} />
      </div>
    </div>
  );
}
