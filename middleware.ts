import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        // Protect API routes (except webhooks and embed)
        if (req.nextUrl.pathname.startsWith('/api')) {
          if (
            req.nextUrl.pathname.startsWith('/api/webhooks') ||
            req.nextUrl.pathname.startsWith('/api/embed') ||
            req.nextUrl.pathname.startsWith('/api/auth')
          ) {
            return true
          }
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}