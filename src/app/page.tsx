import Link from 'next/link';
import pool from '@/lib/db';
import { createCompany } from './actions';
import { logoutAction } from './login/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let companies: any[] = [];
  try {
    const res = await pool.query('SELECT id, symbol, name, sector FROM companies ORDER BY updated_at DESC');
    companies = res.rows;
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="p-8 font-sans min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Caplore Admin Dashboard</h1>
          <form action={logoutAction}>
            <button type="submit" className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors">
              Logout
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black">Add New Company</h2>
          <form action={createCompany} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Symbol</label>
              <input type="text" name="symbol" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="e.g. abcengg" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
              <input type="text" name="name" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="ABC Engineering" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Sector</label>
              <input type="text" name="sector" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="Manufacturing" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium h-10">Add</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black">Companies</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-gray-800">Symbol</th>
                <th className="py-3 px-4 text-gray-800">Name</th>
                <th className="py-3 px-4 text-gray-800">Sector</th>
                <th className="py-3 px-4 text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-black">{company.symbol}</td>
                  <td className="py-3 px-4 text-black">{company.name}</td>
                  <td className="py-3 px-4 text-gray-600">{company.sector}</td>
                  <td className="py-3 px-4">
                    <Link href={`/companies/${company.id}`} className="text-blue-600 hover:underline font-medium">
                      Manage Data
                    </Link>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-gray-500 text-center bg-gray-50/50 rounded-b-lg">
                    No companies found. Add one using the form above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
