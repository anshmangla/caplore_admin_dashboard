import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const res = await pool.query('SELECT id, symbol, name, sector FROM companies ORDER BY updated_at DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol, name, sector, location } = body;
    
    const res = await pool.query(
      `INSERT INTO companies (symbol, name, sector, location) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [symbol, name, sector, location]
    );
    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
