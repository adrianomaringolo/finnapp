import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge'
import { NextRequest, NextResponse } from 'next/server'
import { clientConfig, serverConfig } from './config'

const PUBLIC_PATHS = ['/register', '/login']

export function redirectTo(request: NextRequest, path: string) {
	const url = request.nextUrl.clone()
	url.pathname = path

	return NextResponse.redirect(url)
}

export async function middleware(request: NextRequest) {
	return authMiddleware(request, {
		loginPath: '/api/login',
		logoutPath: '/api/logout',
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		cookieSerializeOptions: serverConfig.cookieSerializeOptions,
		serviceAccount: serverConfig.serviceAccount,

		handleValidToken: async ({}, headers) => {
			if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
				return redirectTo(request, '/inicio')
			}

			if (request.nextUrl.pathname === '/') {
				return redirectTo(request, '/inicio')
			}

			return NextResponse.next({
				request: {
					headers,
				},
			})
		},
		handleInvalidToken: async (reason) => {
			console.info('Missing or malformed credentials', { reason })

			return redirectToLogin(request, {
				path: '/login',
				publicPaths: PUBLIC_PATHS,
			})
		},
		handleError: async (error) => {
			console.error('Unhandled authentication error', { error })

			return redirectToLogin(request, {
				path: '/login',
				publicPaths: PUBLIC_PATHS,
			})
		},
	})
}

export const config = {
	matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
}
