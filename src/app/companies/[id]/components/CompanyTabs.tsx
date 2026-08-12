'use client';

import { useState } from 'react';
import BaseDetailsForm from './BaseDetailsForm';
import PromotersListEditor from './PromotersListEditor';

export default function CompanyTabs({ company, promoters }: { company: any, promoters: any[] }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'promoters', label: 'Promoters' },
    // { id: 'financials', label: 'Financials' },
    // { id: 'analysis', label: 'Analysis' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-gray-50 rounded-t-lg px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && <BaseDetailsForm company={company} />}
        {activeTab === 'promoters' && <PromotersListEditor companyId={company.id} promoters={promoters} />}
      </div>
    </div>
  );
}
