'use client';

import { useTransition } from 'react';
import { updateInvestmentDetails } from '../actions';

export default function InvestmentEditor({ company }: { company: any }) {
  const [isPending, startTransition] = useTransition();

  async function action(formData: FormData) {
    startTransition(async () => {
      await updateInvestmentDetails(company.id, formData);
      alert("Investment details saved!");
    });
  }

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Side-Rail: Express Interest</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Default Investment Amount</label>
            <input name="investment_amount_default" defaultValue={company.investment_amount_default || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. 25,00,000" />
            <p className="mt-1 text-xs text-gray-500">Default value in the input field</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Note</label>
            <input name="investment_minimum_note" defaultValue={company.investment_minimum_note || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. Minimum ₹25 Lakh · Closes 30 Jun 2025" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Investor Initials (comma separated)</label>
            <input name="investment_investor_initials" defaultValue={company.investment_investor_initials || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. A, R, K, M" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Investors Count</label>
            <input name="investment_interested_investors" defaultValue={company.investment_interested_investors || ''} type="number" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. 28" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Side-Rail: Raise Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Raised</label>
            <input name="raise_raised" defaultValue={company.raise_raised || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. ₹74 Cr" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target</label>
            <input name="raise_target" defaultValue={company.raise_target || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. ₹120 Cr" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Percent Funded</label>
            <div className="flex items-center gap-2">
              <input name="raise_percent" defaultValue={company.raise_percent || ''} type="number" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. 62" />
              <span className="text-gray-500 text-sm font-semibold">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remaining Text</label>
            <input name="raise_remaining" defaultValue={company.raise_remaining || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. ₹46 Cr remaining" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Investors (Total)</label>
            <input name="raise_investors" defaultValue={company.raise_investors || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. 28" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Days Left</label>
            <input name="raise_days_left" defaultValue={company.raise_days_left || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. 12" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Average Ticket</label>
            <input name="raise_average_ticket" defaultValue={company.raise_average_ticket || ''} type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. ₹2.6 Cr" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Investment Details'}
        </button>
      </div>
    </form>
  );
}
