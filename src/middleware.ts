import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/locales';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'jp',
  localePrefix: 'never', // This setting controls how locales are handled in the URL
});

export function middleware(req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all pathnames except for those starting with `/api`, `/_next`, `/_vercel`, or containing a dot (e.g., `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
