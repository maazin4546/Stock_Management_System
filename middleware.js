import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token'); 

    const publicRoutes = ['/login', '/register'];

    // If the user is authenticated (token exists), redirect them away from login and register pages to the home page
    if (publicRoutes.includes(pathname) && token) {
        try {     
            jwt.verify(token, process.env.JWT_SECRET);         
            return NextResponse.redirect(new URL('/', req.url));

        } catch (error) {          
            return NextResponse.next();
        }
    }

    const protectedRoutes = ['/', '/form', '/table', '/cart'];

    // Check if the route is protected and if the token is missing or invalid
    if (protectedRoutes.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // If the route is not protected or public, allow access
    return NextResponse.next();
}
