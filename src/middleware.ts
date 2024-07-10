import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const nextIntMiddleware = createMiddleware({
  locales: ['en', 'jp'],
  defaultLocale: 'jp',
});

export default function (req: NextRequest, res: NextResponse) {
  return nextIntMiddleware(req);
}

export const config = {
  // match only internal pathnames
  matcher: ['/', '/(jp|en)/:path*'],
}