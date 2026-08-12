'use client';

import { updateCompanyDetails } from '../actions';

export default function BaseDetailsForm({ company }: { company: any }) {
  // We use the Server Action directly on the form
  const updateWithId = updateCompanyDetails.bind(null, company.id);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-black">Company Overview</h2>
      <form action={updateWithId} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Company Name</label>
            <input type="text" name="name" defaultValue={company.name} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Sector</label>
            <input type="text" name="sector" defaultValue={company.sector} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
            <input type="text" name="location" defaultValue={company.location} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Timeline</label>
            <input type="text" name="timeline" defaultValue={company.timeline} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Target Raise</label>
            <input type="text" name="target_raise" defaultValue={company.target_raise} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Minimum Ticket</label>
            <input type="text" name="minimum_ticket" defaultValue={company.minimum_ticket} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Risk Profile</label>
            <input type="text" name="risk" defaultValue={company.risk} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Teaser</label>
          <textarea name="teaser" defaultValue={company.teaser} rows={3} className="border border-gray-300 rounded px-3 py-2 w-full text-black bg-white" />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
