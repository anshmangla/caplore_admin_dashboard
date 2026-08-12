'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD || 'caplore-admin-2026';

  if (password === adminPassword) {
    const cookieStore = await cookies();
    // Set a secure HTTP-only cookie that expires in 24 hours
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Re-enabled for Cloudflare HTTPS
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    
    redirect('/');
  }

  // If wrong password, return error
  return { error: 'Invalid admin password' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
