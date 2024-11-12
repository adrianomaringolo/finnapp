import { FooterComponent } from '@/components/navigation/footer'
import { ResponsiveNav } from '@/components/navigation/responsive-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-gray-100 min-h-dvh flex flex-col">
			<ResponsiveNav />
			<main className="m-5 rounded-xl max-w-4xl mx-auto bg-white p-2 md:p-6 flex-1 w-full">
				{children}
			</main>
			<FooterComponent />
		</div>
	)
}
