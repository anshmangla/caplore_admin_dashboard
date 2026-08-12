import Link from 'next/link';
import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import CompanyTabs from './components/CompanyTabs';

export const dynamic = 'force-dynamic';

export default async function CompanyManageDataPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15+, params is a Promise that must be awaited
  const resolvedParams = await params;
  const companyId = resolvedParams.id;

  // Fetch Base Company Data
  const companyRes = await pool.query(`SELECT * FROM companies WHERE id = $1`, [companyId]);
  if (companyRes.rows.length === 0) {
    notFound();
  }
  const company = companyRes.rows[0];

  // Fetch all related data in parallel
  const [
    promotersRes,
    statsRes,
    financialsRes,
    analysisRes,
    comparablesRes,
    documentsRes,
    timelineRes
  ] = await Promise.all([
    pool.query(`SELECT * FROM company_promoters WHERE company_id = $1 ORDER BY id ASC`, [companyId]),
    pool.query(`SELECT * FROM company_stats WHERE company_id = $1 ORDER BY id ASC`, [companyId]),
    pool.query(`SELECT * FROM company_financials WHERE company_id = $1 ORDER BY id ASC`, [companyId]),
    pool.query(`SELECT * FROM company_analysis WHERE company_id = $1 ORDER BY id ASC`, [companyId]),
    pool.query(`SELECT * FROM company_comparables WHERE company_id = $1 ORDER BY id ASC`, [companyId]),
    pool.query(`SELECT * FROM company_documents WHERE company_id = $1 ORDER BY id ASC`, [companyId]),
    pool.query(`SELECT * FROM company_timeline_events WHERE company_id = $1 ORDER BY id ASC`, [companyId])
  ]);

  return (
    <div className="p-8 font-sans min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:underline text-sm font-medium mb-2 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-black flex items-center gap-3">
              Manage Data: {company.name} 
              <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{company.symbol}</span>
            </h1>
          </div>
        </div>

        {/* Tabbed Interface */}
        <CompanyTabs 
          company={company} 
          promoters={promotersRes.rows} 
          stats={statsRes.rows}
          financials={financialsRes.rows}
          analysis={analysisRes.rows}
          comparables={comparablesRes.rows}
          documents={documentsRes.rows}
          timeline={timelineRes.rows}
        />

      </div>
    </div>
  );
}
