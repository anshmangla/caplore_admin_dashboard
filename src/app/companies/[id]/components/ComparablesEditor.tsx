'use client';

import { addComparable, deleteComparable } from '../actions';

export default function ComparablesEditor({ companyId, comparables }: { companyId: string, comparables: any[] }) {
  const addWithId = addComparable.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Peer Comparables</h2>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Peer Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Revenue</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">EBITDA Margin</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">P/E Ratio</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">EV/EBITDA</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Market Cap</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {comparables.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-black font-medium">{c.peer_name}</td>
                <td className="py-3 px-4 text-gray-600">{c.revenue}</td>
                <td className="py-3 px-4 text-gray-600">{c.ebitda_margin}</td>
                <td className="py-3 px-4 text-gray-600">{c.pe_ratio}</td>
                <td className="py-3 px-4 text-gray-600">{c.ev_ebitda}</td>
                <td className="py-3 px-4 text-gray-600">{c.market_cap}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteComparable(companyId, c.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {comparables.length === 0 && (
              <tr><td colSpan={7} className="py-6 text-center text-gray-500">No peers added.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add Peer</h3>
        <form action={addWithId} className="grid grid-cols-6 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input type="text" name="peer_name" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Revenue</label>
            <input type="text" name="revenue" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">EBITDA Margin</label>
            <input type="text" name="ebitda_margin" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">P/E Ratio</label>
            <input type="text" name="pe_ratio" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">EV/EBITDA</label>
            <input type="text" name="ev_ebitda" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Market Cap</label>
            <input type="text" name="market_cap" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div className="col-span-6 flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium h-10">Add Peer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
