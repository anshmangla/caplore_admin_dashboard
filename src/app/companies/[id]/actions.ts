'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateCompanyDetails(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const sector = formData.get('sector') as string;
  const location = formData.get('location') as string;
  const target_raise = formData.get('target_raise') as string;
  const minimum_ticket = formData.get('minimum_ticket') as string;
  const timeline = formData.get('timeline') as string;
  const risk = formData.get('risk') as string;
  const teaser = formData.get('teaser') as string;

  await pool.query(
    `UPDATE companies SET 
      name = $1, sector = $2, location = $3, target_raise = $4, 
      minimum_ticket = $5, timeline = $6, risk = $7, teaser = $8,
      updated_at = NOW()
    WHERE id = $9`,
    [name, sector, location, target_raise, minimum_ticket, timeline, risk, teaser, id]
  );

  revalidatePath(`/companies/${id}`);
}

export async function addPromoter(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const initials = formData.get('initials') as string;
  const role = formData.get('role') as string;
  const holding = formData.get('holding_percentage') as string;
  const color = formData.get('color_tag') as string;

  await pool.query(
    `INSERT INTO company_promoters (company_id, name, initials, role, holding_percentage, color_tag)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, name, initials, role, holding, color || null]
  );

  revalidatePath(`/companies/${id}`);
}

export async function deletePromoter(companyId: string, promoterId: string) {
  await pool.query(`DELETE FROM company_promoters WHERE id = $1 AND company_id = $2`, [promoterId, companyId]);
  revalidatePath(`/companies/${companyId}`);
}

// Stats Actions
export async function addStat(companyId: string, formData: FormData) {
  const section = formData.get('section') as string;
  const label = formData.get('label') as string;
  const value = formData.get('value') as string;
  const emphasis_or_color = formData.get('emphasis_or_color') as string;

  await pool.query(
    `INSERT INTO company_stats (company_id, section, label, value, score, emphasis_or_color) VALUES ($1, $2, $3, $4, $5, $6)`,
    [companyId, section, label, section === 'overview_scores' ? null : value, section === 'overview_scores' ? parseInt(value) : null, emphasis_or_color || null]
  );
  revalidatePath(`/companies/${companyId}`);
}
export async function deleteStat(companyId: string, id: string) {
  await pool.query(`DELETE FROM company_stats WHERE id = $1 AND company_id = $2`, [id, companyId]);
  revalidatePath(`/companies/${companyId}`);
}

// Financials Actions
export async function addFinancial(companyId: string, formData: FormData) {
  const statement_type = formData.get('statement_type') as string;
  const year_label = formData.get('year_label') as string;
  const metric_name = formData.get('metric_name') as string;
  const metric_value = formData.get('metric_value') as string;

  await pool.query(
    `INSERT INTO company_financials (company_id, statement_type, year_label, metric_name, metric_value) VALUES ($1, $2, $3, $4, $5)`,
    [companyId, statement_type, year_label, metric_name, metric_value]
  );
  revalidatePath(`/companies/${companyId}`);
}
export async function deleteFinancial(companyId: string, id: string) {
  await pool.query(`DELETE FROM company_financials WHERE id = $1 AND company_id = $2`, [id, companyId]);
  revalidatePath(`/companies/${companyId}`);
}

// Analysis Actions
export async function addAnalysis(companyId: string, formData: FormData) {
  const type = formData.get('type') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const risk_level = formData.get('risk_level') as string;

  await pool.query(
    `INSERT INTO company_analysis (company_id, type, title, description, risk_level) VALUES ($1, $2, $3, $4, $5)`,
    [companyId, type, title, description, risk_level || null]
  );
  revalidatePath(`/companies/${companyId}`);
}
export async function deleteAnalysis(companyId: string, id: string) {
  await pool.query(`DELETE FROM company_analysis WHERE id = $1 AND company_id = $2`, [id, companyId]);
  revalidatePath(`/companies/${companyId}`);
}

// Comparables Actions
export async function addComparable(companyId: string, formData: FormData) {
  const peer_name = formData.get('peer_name') as string;
  const revenue = formData.get('revenue') as string;
  const ebitda_margin = formData.get('ebitda_margin') as string;
  const pe_ratio = formData.get('pe_ratio') as string;
  const ev_ebitda = formData.get('ev_ebitda') as string;
  const market_cap = formData.get('market_cap') as string;

  await pool.query(
    `INSERT INTO company_comparables (company_id, peer_name, revenue, ebitda_margin, pe_ratio, ev_ebitda, market_cap) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [companyId, peer_name, revenue, ebitda_margin, pe_ratio, ev_ebitda, market_cap]
  );
  revalidatePath(`/companies/${companyId}`);
}
export async function deleteComparable(companyId: string, id: string) {
  await pool.query(`DELETE FROM company_comparables WHERE id = $1 AND company_id = $2`, [id, companyId]);
  revalidatePath(`/companies/${companyId}`);
}

// Documents Actions
export async function addDocument(companyId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const detail = formData.get('detail') as string;
  const url = formData.get('url') as string;

  await pool.query(
    `INSERT INTO company_documents (company_id, title, detail, locked, url) VALUES ($1, $2, $3, false, $4)`,
    [companyId, title, detail, url]
  );
  revalidatePath(`/companies/${companyId}`);
}
export async function deleteDocument(companyId: string, id: string) {
  await pool.query(`DELETE FROM company_documents WHERE id = $1 AND company_id = $2`, [id, companyId]);
  revalidatePath(`/companies/${companyId}`);
}

// Timeline Actions
export async function addTimeline(companyId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const state = formData.get('state') as string;
  const date = formData.get('date') as string;

  await pool.query(
    `INSERT INTO company_timeline_events (company_id, title, state, date) VALUES ($1, $2, $3, $4)`,
    [companyId, title, state, date]
  );
  revalidatePath(`/companies/${companyId}`);
}
export async function deleteTimeline(companyId: string, id: string) {
  await pool.query(`DELETE FROM company_timeline_events WHERE id = $1 AND company_id = $2`, [id, companyId]);
  revalidatePath(`/companies/${companyId}`);
}
