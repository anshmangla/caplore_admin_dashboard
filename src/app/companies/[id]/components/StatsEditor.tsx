'use client';

import { addStat, deleteStat } from '../actions';

export default function StatsEditor({ companyId, stats }: { companyId: string, stats: any[] }) {
  const addWithId = addStat.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Company Stats & Highlights</h2>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Section</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Label</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Value / Score</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Emphasis / Color</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600 capitalize">{s.section.replace('_', ' ')}</td>
                <td className="py-3 px-4 text-black font-medium">{s.label}</td>
                <td className="py-3 px-4 text-black">{s.value || s.score}</td>
                <td className="py-3 px-4 text-gray-600">{s.emphasis_or_color || '-'}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteStat(companyId, s.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {stats.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-gray-500">No stats added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add New Stat</h3>
        <form action={addWithId} className="grid grid-cols-5 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Section</label>
            <select name="section" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white">
              <option value="hero">Hero Stat</option>
              <option value="overview_facts">Overview Fact</option>
              <option value="overview_scores">Overview Score</option>
              <option value="investment_details">Investment Details</option>
              <option value="investment_observations">AI Observations</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Label</label>
            <input type="text" name="label" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="e.g. Revenue" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Value (or Score)</label>
            <input type="text" name="value" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="₹100 Cr / 85" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Emphasis / Color</label>
            <input type="text" name="emphasis_or_color" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="e.g. text-green-500" />
          </div>
          <div className="col-span-1">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium w-full h-10">Add Stat</button>
          </div>
        </form>
      </div>
    </div>
  );
}
