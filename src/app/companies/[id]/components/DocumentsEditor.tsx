'use client';

import { addDocument, deleteDocument } from '../actions';

export default function DocumentsEditor({ companyId, documents }: { companyId: string, documents: any[] }) {
  const addWithId = addDocument.bind(null, companyId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Company Documents</h2>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Title</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Detail</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">URL</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Locked</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-black font-medium">{d.title}</td>
                <td className="py-3 px-4 text-gray-600">{d.detail}</td>
                <td className="py-3 px-4 text-blue-600 truncate max-w-[150px]"><a href={d.url} target="_blank" rel="noreferrer">{d.url}</a></td>
                <td className="py-3 px-4 text-gray-600">{d.locked ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteDocument(companyId, d.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-gray-500">No documents added.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-black">Add Document</h3>
        <form action={addWithId} className="grid grid-cols-5 gap-4 items-end">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
            <input type="text" name="title" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="Pitch Deck" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Detail</label>
            <input type="text" name="detail" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="PDF • 2MB" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">URL</label>
            <input type="text" name="url" required className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" placeholder="https://..." />
          </div>
          <div className="col-span-1 flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium w-full h-10">Add Doc</button>
          </div>
        </form>
      </div>
    </div>
  );
}
