import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check settings for maintenance mode and registration restrictions
  try {
    // Get settings from database
    const { data: settings } = await supabase
      .from('settings')
      .select('key, value')
      .in('key', ['maintenance_mode', 'allow_registration'])

    if (settings) {
      const maintenanceMode = settings.find(s => s.key === 'maintenance_mode')?.value
      const allowRegistration = settings.find(s => s.key === 'allow_registration')?.value

      // Check maintenance mode
      if (maintenanceMode === true) {
        // Allow access to admin pages and API routes even in maintenance mode
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') || 
                           req.nextUrl.pathname.startsWith('/api/admin')
        const isApiRoute = req.nextUrl.pathname.startsWith('/api')
        
        if (!isAdminRoute && !isApiRoute) {
          // Redirect to maintenance page or show maintenance mode
          // For now, we'll let the client-side handle this
          return res
        }
      }

      // Check registration restrictions
      if (allowRegistration === false) {
        // Block registration routes
        if (req.nextUrl.pathname.startsWith('/auth/register')) {
          return NextResponse.redirect(new URL('/auth/login?error=registration_disabled', req.url))
        }
      }
    }
  } catch (error) {
    // If settings check fails, continue normally
    console.warn('Settings check failed in middleware:', error)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}