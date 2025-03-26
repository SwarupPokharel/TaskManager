import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookie = (await cookies()).get('token');
  if (!cookie) {
    return NextResponse.json({ message: 'No token found' });
  }
  return NextResponse.json({ token: cookie.value });
}
