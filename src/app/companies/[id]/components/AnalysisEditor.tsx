'use client';

import { addAnalysis, deleteAnalysis } from '../actions';

export default function AnalysisEditor({ companyId, analysis }: { companyId: string, analysis: any[] }) {
  const addWithId = addAnalysis.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Risks & Strengths</h2>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Type</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Title</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Description</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Risk Level</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {analysis.map((a) => (
              <tr key={a.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${a.type === 'risk' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {a.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4 text-black font-medium">{a.title}</td>
                <td className="py-3 px-4 text-gray-600 text-sm max-w-xs truncate" title={a.description}>{a.description}</td>
                <td className="py-3 px-4 text-gray-600">{a.risk_level || '-'}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteAnalysis(companyId, a.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {analysis.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-gray-500">No analysis points added.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add Risk or Strength</h3>
        <form action={addWithId} className="grid grid-cols-2 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Type</label>
            <select name="type" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white">
              <option value="risk">Risk</option>
              <option value="strength">Strength</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
            <input type="text" name="title" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea name="description" required rows={2} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Risk Level (Optional, e.g. High)</label>
            <input type="text" name="risk_level" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1 flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium h-10">Add Point</button>
          </div>
        </form>
      </div>
    </div>
  );
}
