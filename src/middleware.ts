import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export default async function middleware(request: NextRequest) {
  const token = await getToken({req: request, secret:process.env.NEXTAUTH_SECRET});
  if(!token){
    if(request.nextUrl.pathname.startsWith('/perfil')){
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } 

  if (token){
    if(["/login", "/registro"].includes(request.nextUrl.pathname)){
      return NextResponse.redirect(new URL('/perfil', request.url))
    }
  }
}
 
export const config = {
  matcher: ['/perfil/:path*', '/login', '/registro'],
}