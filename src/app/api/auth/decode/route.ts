import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const decodeJWT = (token: string) => {
    try {
        const [header, payload] = token.split('.').slice(0, 2);
        const parseBase64 = (str: string) => JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
        return { header: parseBase64(header), payload: parseBase64(payload) };
    } catch {
        return null;
    }
};

export async function GET() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Token not found in cookies' }, { status: 401 });
    }

    const decoded = decodeJWT(token);
    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
    const payload = NextResponse.json(decoded.payload);
    return payload;
}
