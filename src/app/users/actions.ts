'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function getUsers() {
  const res = await pool.query(`
    SELECT id, username, name, email, phone_number, created_at 
    FROM app_users 
    ORDER BY created_at DESC
  `);
  return res.rows;
}

export async function createUser(formData: FormData) {
  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone_number = formData.get('phone_number') as string;
  const password = formData.get('password') as string;

  if (!password) {
    return { error: 'Password is required for new users' };
  }

  const password_hash = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      `INSERT INTO app_users (username, name, email, phone_number, password_hash)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, name, email, phone_number, password_hash]
    );
    revalidatePath('/users');
    return { success: true };
  } catch (err: any) {
    console.error(err);
    if (err.code === '23505') {
      return { error: 'Username already exists' };
    }
    return { error: 'Failed to create user' };
  }
}

export async function updateUser(id: string, formData: FormData) {
  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone_number = formData.get('phone_number') as string;
  const password = formData.get('password') as string;

  try {
    if (password && password.trim() !== '') {
      const password_hash = await bcrypt.hash(password, 10);
      await pool.query(
        `UPDATE app_users 
         SET username = $1, name = $2, email = $3, phone_number = $4, password_hash = $5
         WHERE id = $6`,
        [username, name, email, phone_number, password_hash, id]
      );
    } else {
      await pool.query(
        `UPDATE app_users 
         SET username = $1, name = $2, email = $3, phone_number = $4
         WHERE id = $5`,
        [username, name, email, phone_number, id]
      );
    }
    revalidatePath('/users');
    return { success: true };
  } catch (err: any) {
    console.error(err);
    if (err.code === '23505') {
      return { error: 'Username already exists' };
    }
    return { error: 'Failed to update user' };
  }
}

export async function deleteUser(id: string) {
  try {
    await pool.query('DELETE FROM app_users WHERE id = $1', [id]);
    revalidatePath('/users');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to delete user' };
  }
}
