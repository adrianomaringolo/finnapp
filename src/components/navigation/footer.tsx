'use client'

import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export function FooterComponent() {
	return (
		<footer className="bg-gray-100 text-gray-600 py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Sobre nós</h3>
						<p className="text-sm">
							We are a company dedicated to providing excellent services and products to
							our customers.
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Links rápidos</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/termos-de-uso" className="text-sm hover:text-gray-900">
									Termos de uso
								</Link>
							</li>
							<li>
								<Link
									href="/politica-de-privacidade"
									className="text-sm hover:text-gray-900"
								>
									Política de privacidade
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm hover:text-gray-900">
									FAQ
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm hover:text-gray-900">
									Blog
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Contato</h3>
						<p className="text-sm">123 Main St, Anytown, USA 12345</p>
						<p className="text-sm">Phone: (123) 456-7890</p>
						<p className="text-sm">Email: info@example.com</p>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Redes sociais</h3>
						<div className="flex space-x-4">
							<a href="#" className="text-gray-600 hover:text-gray-900">
								<Facebook size={20} />
								<span className="sr-only">Facebook</span>
							</a>
							<a href="#" className="text-gray-600 hover:text-gray-900">
								<Twitter size={20} />
								<span className="sr-only">Twitter</span>
							</a>
							<a href="#" className="text-gray-600 hover:text-gray-900">
								<Instagram size={20} />
								<span className="sr-only">Instagram</span>
							</a>
							<a href="#" className="text-gray-600 hover:text-gray-900">
								<Linkedin size={20} />
								<span className="sr-only">LinkedIn</span>
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-200 text-center">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} Amigo do Bolso. Todos os direitos reservados
					</p>
				</div>
			</div>
		</footer>
	)
}
