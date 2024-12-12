/* eslint-disable @next/next/no-page-custom-font */
import { DialogProvider } from '@/components/dialog-context'
import { Toaster } from '@/components/ui/sonner'
import { Montserrat } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Montserrat({
	subsets: ['latin'],
	display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.className}>
			<head>
				<meta name="application-name" content="Amigo do Bolso" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="Amigo do Bolso" />
				<meta name="description" content="O amigo das suas finanças" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				<meta name="msapplication-TileColor" content="#2B5797" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#000000" />

				<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/touch-icon-iphone-retina.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="167x167"
					href="/icons/touch-icon-ipad-retina.png"
				/>

				<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
				<link rel="shortcut icon" href="/favicon.png" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:url" content="https://yourdomain.com" />
				<meta name="twitter:title" content="Amigo do Bolso" />
				<meta name="twitter:description" content="O amigo das suas finanças" />
				<meta
					name="twitter:image"
					content="https://yourdomain.com/icons/android-chrome-192x192.png"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Amigo do Bolso" />
				<meta property="og:description" content="O amigo das suas finanças" />
				<meta property="og:site_name" content="Amigo do Bolso" />
				<meta property="og:url" content="https://yourdomain.com" />
				<meta
					property="og:image"
					content="https://yourdomain.com/icons/apple-touch-icon.png"
				/>

				{/* <!-- apple splash screen images -->
        <!--
        <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
        --> */}
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
				/>
				<title>Amigo do Bolso</title>
			</head>

			<body>
				<DialogProvider>
					<Suspense>{children}</Suspense>
				</DialogProvider>
				<Toaster
					expand
					toastOptions={{
						classNames: {
							error: 'bg-expense-foreground text-expense border-0',
							success: 'bg-income-foreground text-income border-0',
							warning: 'bg-yellow-200 text-yellow-800 border-0',
							info: 'bg-blue-200 text-blue-800 border-0',
						},
					}}
				/>
			</body>
		</html>
	)
}
