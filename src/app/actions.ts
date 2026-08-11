'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createCompany(formData: FormData) {
  const symbol = formData.get('symbol') as string;
  const name = formData.get('name') as string;
  const sector = formData.get('sector') as string;
  
  if (!symbol || !name) return;

  try {
    await pool.query(
      'INSERT INTO companies (symbol, name, sector) VALUES ($1, $2, $3)',
      [symbol, name, sector]
    );
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to create company:', error);
    // You could return an error state here, but throwing/logging is fine for this scaffolding
  }
}
