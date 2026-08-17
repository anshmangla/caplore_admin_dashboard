'use client';

import { useState } from 'react';
import BaseDetailsForm from './BaseDetailsForm';
import PromotersListEditor from './PromotersListEditor';
import StatsEditor from './StatsEditor';
import FinancialsEditor from './FinancialsEditor';
import AnalysisEditor from './AnalysisEditor';
import ComparablesEditor from './ComparablesEditor';
import DocumentsEditor from './DocumentsEditor';
import TimelineEditor from './TimelineEditor';
import InvestmentEditor from './InvestmentEditor';

export default function CompanyTabs({ 
  company, 
  promoters,
  stats,
  financials,
  analysis,
  comparables,
  documents,
  timeline
}: any) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'investment', label: 'Investment Data' },
    { id: 'stats', label: 'Stats' },
    { id: 'financials', label: 'Financials' },
    { id: 'promoters', label: 'Promoters' },
    { id: 'analysis', label: 'Risks & Strengths' },
    { id: 'comparables', label: 'Comparables' },
    { id: 'documents', label: 'Documents' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 bg-gray-50 rounded-t-lg px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 md:px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
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
        {activeTab === 'investment' && <InvestmentEditor company={company} />}
        {activeTab === 'stats' && <StatsEditor companyId={company.id} stats={stats} />}
        {activeTab === 'financials' && <FinancialsEditor companyId={company.id} financials={financials} />}
        {activeTab === 'promoters' && <PromotersListEditor companyId={company.id} promoters={promoters} />}
        {activeTab === 'analysis' && <AnalysisEditor companyId={company.id} analysis={analysis} />}
        {activeTab === 'comparables' && <ComparablesEditor companyId={company.id} comparables={comparables} />}
        {activeTab === 'documents' && <DocumentsEditor companyId={company.id} documents={documents} />}
        {activeTab === 'timeline' && <TimelineEditor companyId={company.id} timeline={timeline} />}
      </div>
    </div>
  );
}
