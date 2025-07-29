import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const errorCode = requestUrl.searchParams.get('error_code')

  console.log("🔍 Auth callback:", {
    code: code ? 'exists' : 'none',
    error,
    errorCode,
    errorDescription,
    url: requestUrl.href
  })

  // Handle specific email verification errors
  if (error) {
    console.error('❌ Auth callback error:', { error, errorCode, errorDescription })
    if (errorCode === 'otp_expired') {
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=email_expired&message=${encodeURIComponent('Link verifikasi email telah kedaluwarsa. Silakan daftar ulang atau minta link baru.')}`
      )
    }
    if (error === 'access_denied') {
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=access_denied&message=${encodeURIComponent('Verifikasi email dibatalkan atau gagal.')}`
      )
    }
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/login?error=callback_error&message=${encodeURIComponent(errorDescription || error)}`
    )
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    try {
      console.log("🔄 Exchanging code for session...")
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        console.error('❌ Error exchanging code:', exchangeError)
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/login?error=callback_error&message=${encodeURIComponent(exchangeError.message)}`
        )
      }
      if (data.session && data.user) {
        console.log('✅ Email verification successful for:', data.user.email)
        if (data.user.email_confirmed_at) {
          return NextResponse.redirect(
            `${requestUrl.origin}/?message=email_verified&welcome=true`
          )
        }
        return NextResponse.redirect(`${requestUrl.origin}/`)
      } else {
        console.error('❌ No session data returned')
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/login?error=no_session`
        )
      }
    } catch (error) {
      console.error('❌ Unexpected error in auth callback:', error)
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=server_error&message=${encodeURIComponent(String(error))}`
      )
    }
  }

  console.log("❌ No code parameter found")
  return NextResponse.redirect(
    `${requestUrl.origin}/auth/login?error=no_code`
  )
}