'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BadgePlus, DollarSign, Gauge, List } from 'lucide-react'
import Link from 'next/link'

export const ShortcutsCard = () => {
	return (
		<Card className="break-inside-avoid-column inline-block w-full my-4 mt-0 p-4">
			<CardTitle>Atalhos</CardTitle>
			<CardContent className="flex flex-wrap px-0 pt-2 gap-2">
				<Link href="/lancamentos?m=nova" className="flex-1 min-w-32">
					<div
						className={cn(
							'border p-3 rounded my-1 flex flex-col gap-2 justify-center items-center',
							'text-blue-400 cursor-pointer transition-all',
							'hover:bg-blue-400 hover:text-white',
						)}
					>
						<BadgePlus size={40} />
						<p className="text-gray-900 text-center">Adicionar</p>
					</div>
				</Link>
				<Link href="/lancamentos" className="flex-1 min-w-32">
					<div
						className={cn(
							'border p-3 rounded my-1 flex flex-col gap-2 justify-center items-center',
							'text-gray-400 cursor-pointer transition-all',
							'hover:bg-gray-400 hover:text-white',
						)}
					>
						<DollarSign size={40} />
						<p className="text-gray-900 text-center">Transações</p>
					</div>
				</Link>
				<Link href="/relatorios?t=despesas" className="flex-1 min-w-32">
					<div
						className={cn(
							'border p-3 rounded my-1 flex flex-col gap-2 justify-center items-center',
							'text-orange-400 cursor-pointer transition-all',
							'hover:bg-orange-400 hover:text-white',
						)}
					>
						<List size={40} />
						<p className="text-gray-900 text-center">Relatório despesas</p>
					</div>
				</Link>
				<Link href="/relatorios?t=mapa" className="flex-1 min-w-32">
					<div
						className={cn(
							'border p-3 rounded my-1 flex flex-col gap-2 justify-center items-center',
							'text-red-400 cursor-pointer transition-all',
							'hover:bg-red-400 hover:text-white',
						)}
					>
						<Gauge size={40} />
						<p className="text-gray-900 text-center">Mapa de categorias</p>
					</div>
				</Link>
			</CardContent>
		</Card>
	)
}
