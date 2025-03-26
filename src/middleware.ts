import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('token')?.value;

    if (!authToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    try {
        const [header, payload] = authToken.split('.').slice(0, 2);
        const parseBase64 = (str: string) => JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
        const { role } = parseBase64(payload);

        if (!role) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (role && request.nextUrl.pathname === "/dashboard") {
            switch (role) {
                case "admin":
                    return NextResponse.redirect(new URL("/dashboard/adminDashboard", request.url));
                case "user":
                    return NextResponse.redirect(new URL("/dashboard/userDashboard", request.url));
                default:
                    return NextResponse.redirect(new URL("/", request.url));
            }
        }
        return NextResponse.next();

    } catch (error) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
