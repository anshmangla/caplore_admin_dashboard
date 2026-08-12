'use client';

import { addTimeline, deleteTimeline } from '../actions';

export default function TimelineEditor({ companyId, timeline }: { companyId: string, timeline: any[] }) {
  const addWithId = addTimeline.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Timeline Events</h2>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Date</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">State</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Title</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600 font-mono">{t.date}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${t.state === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {t.state}
                  </span>
                </td>
                <td className="py-3 px-4 text-black font-medium">{t.title}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteTimeline(companyId, t.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {timeline.length === 0 && (
              <tr><td colSpan={4} className="py-6 text-center text-gray-500">No events added.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add Event</h3>
        <form action={addWithId} className="grid grid-cols-4 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
            <input type="text" name="date" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="Q1 2024" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">State</label>
            <select name="state" className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white">
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
              <option value="future">Future</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
            <input type="text" name="title" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="Series A Round" />
          </div>
          <div className="col-span-1 flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium w-full h-10">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
