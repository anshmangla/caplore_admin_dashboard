'use client';

import { addFinancial, deleteFinancial } from '../actions';

export default function FinancialsEditor({ companyId, financials }: { companyId: string, financials: any[] }) {
  const addWithId = addFinancial.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Financial Statements</h2>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Statement</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Year</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Metric Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Value</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {financials.map((f) => (
              <tr key={f.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600 capitalize">{f.statement_type.replace('_', ' ')}</td>
                <td className="py-3 px-4 text-black font-medium">{f.year_label}</td>
                <td className="py-3 px-4 text-black">{f.metric_name}</td>
                <td className="py-3 px-4 text-black font-mono">{f.metric_value}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteFinancial(companyId, f.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {financials.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-gray-500">No financials added.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add Financial Data Point</h3>
        <form action={addWithId} className="grid grid-cols-5 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Statement Type</label>
            <select name="statement_type" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white">
              <option value="income_statement">Income Statement</option>
              <option value="balance_sheet">Balance Sheet</option>
              <option value="cash_flow">Cash Flow</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Year</label>
            <input type="text" name="year_label" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="e.g. FY23" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Metric</label>
            <input type="text" name="metric_name" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="Revenue" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Value</label>
            <input type="text" name="metric_value" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="100.5" />
          </div>
          <div className="col-span-1 flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium w-full h-10">Add Data</button>
          </div>
        </form>
      </div>
    </div>
  );
}
