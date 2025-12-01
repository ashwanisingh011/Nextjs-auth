import {NextResponse} from "next/server"
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || ''

    // If user has token and tries to access login/signup, redirect to profile
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    // If user has NO token and tries to access protected pages, redirect to login
    if(!isPublicPath && !token && path !== '/'){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: ['/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}