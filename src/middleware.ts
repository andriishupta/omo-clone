import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AppRoute } from '@/common/constants';
import { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabaseMiddlewareClient = createMiddlewareSupabaseClient<Database>({ req, res });
  const {
    data: { session },
    error,
  } = await supabaseMiddlewareClient.auth.getSession();

  if (error) {
    throw new Error('SESSION_ERROR')
  }

  if (session?.user) {
    return res;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = AppRoute.Home;
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
