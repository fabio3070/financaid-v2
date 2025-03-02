import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
    const session = await auth();
    const { pathname } = new URL(request.url);
    console.log("Inside middleware");

    if(pathname.startsWith('/login') || pathname === '/') {
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    if (pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}