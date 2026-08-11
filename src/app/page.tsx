import Link from 'next/link';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let companies = [];
  try {
    const res = await pool.query('SELECT id, symbol, name, sector FROM companies ORDER BY updated_at DESC');
    companies = res.rows;
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8">Caplore Admin Dashboard</h1>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Companies</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Symbol</th>
              <th className="py-2">Name</th>
              <th className="py-2">Sector</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b">
                <td className="py-2">{company.symbol}</td>
                <td className="py-2">{company.name}</td>
                <td className="py-2">{company.sector}</td>
                <td className="py-2">
                  <Link href={`/companies/${company.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-gray-500 text-center">No companies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
