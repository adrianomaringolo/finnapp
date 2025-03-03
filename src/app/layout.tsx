import { PageContentArea } from '@/components/navigation/page-content-area'
import { Montserrat } from 'next/font/google'
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
				<meta name="description" content="Organize as finanças dos seus serviços" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				<meta name="msapplication-TileColor" content="#2B5797" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#000000" />

				<link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
				<link rel="shortcut icon" href="/favicon.png" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:url" content="https://amigodobolso.vercel.app" />
				<meta name="twitter:title" content="Amigo do Bolso" />
				<meta
					name="twitter:description"
					content="Organize as finanças dos seus serviços"
				/>
				<meta
					name="twitter:image"
					content="https://yourdomain.com/icons/android-chrome-192x192.png"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Amigo do Bolso" />
				<meta
					property="og:description"
					content="Organize as finanças dos seus serviços"
				/>
				<meta property="og:site_name" content="Amigo do Bolso" />
				<meta property="og:url" content="https://Amigo do Bolso.com.br" />
				<meta
					property="og:image"
					content="https://yourdomain.com/icons/apple-touch-icon.png"
				/>

				<meta
					name="viewport"
					content="minimum-scale=5, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
				/>
				<title>Amigo do Bolso</title>
			</head>

			<body>
				<PageContentArea>{children}</PageContentArea>
			</body>
		</html>
	)
}
