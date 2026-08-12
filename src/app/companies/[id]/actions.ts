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
  await pool.query(
    `DELETE FROM company_promoters WHERE id = $1 AND company_id = $2`,
    [promoterId, companyId]
  );
  revalidatePath(`/companies/${companyId}`);
}
