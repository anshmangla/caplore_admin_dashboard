'use client';

import { addPromoter, deletePromoter } from '../actions';

export default function PromotersListEditor({ companyId, promoters }: { companyId: string, promoters: any[] }) {
  const addWithId = addPromoter.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Ownership & Promoters</h2>
      
      {/* Existing Promoters Table */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Initials</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Role</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Holding</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {promoters.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-black">
                  <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-bold">{p.initials}</span>
                </td>
                <td className="py-3 px-4 text-black">{p.name}</td>
                <td className="py-3 px-4 text-gray-600">{p.role}</td>
                <td className="py-3 px-4 text-black font-medium">{p.holding_percentage}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => deletePromoter(companyId, p.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {promoters.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">No promoters added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Promoter Form */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add New Promoter</h3>
        <form action={addWithId} className="grid grid-cols-5 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Initials</label>
            <input type="text" name="initials" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="e.g. JD" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input type="text" name="name" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="John Doe" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Role</label>
            <input type="text" name="role" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="Founder" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Holding</label>
            <input type="text" name="holding_percentage" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="45.5%" />
          </div>
          <div className="col-span-1">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium w-full h-10">Add Promoter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
