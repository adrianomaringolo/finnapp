import { cn } from '@/lib/utils'
import {
	CalendarArrowUp,
	CircleDollarSign,
	GraduationCap,
	Heart,
	ShoppingCart,
	Smile,
	Sun,
} from 'lucide-react'

export const AmountTypes = {
	income: 'income',
	expanses: 'expanses',
}

export type AmountType = keyof typeof AmountTypes

export const TransactionTypes = {
	income: {
		type: 'income',
		label: 'Receita',
		max: 100,
		color: '#22c55e',
		icon: (className?: string) => (
			<CircleDollarSign className={cn('w-6 h-6 text-green-400', className)} />
		),

		help: '',
	},
	essential: {
		type: 'expanses',
		label: 'Necessidades essenciais',
		max: 55,
		color: '#60a5fa',
		icon: (className?: string) => (
			<ShoppingCart className={cn('w-6 h-6 text-blue-400', className)} />
		),
		help: 'Nesta categoria entram os gastos ESSENCIAIS para nossa vida, aqueles que realmente são básicos e suficientes para sobrevivermos. Ex.: contas de água, luz, telefone, impostos, aluguel, alimentação.',
	},
	'financial-security': {
		type: 'expanses',
		label: 'Tranquilidade financeira',
		max: 10,
		color: '#ca8a04',
		icon: (className?: string) => (
			<Sun className={cn('w-6 h-6 text-yellow-400', className)} />
		),
		help: 'Nesta categoria o propósito é garantir a Tranquilidade Financeira no futuro. É como investir em si próprio. Dica da No Final das Contas: encare esta categoria como sendo uma OBRIGAÇÃO MENSAL.',
	},

	charity: {
		type: 'expanses',
		label: 'Fazer pelo outro',
		max: 5,
		color: '#ec4899',
		icon: (className?: string) => (
			<Heart className={cn('w-6 h-6 text-pink-400', className)} />
		),
		help: 'Exercitar a gratidão e o compartilhar!<br/>Cientificamente, quem exercita a gratidão tem uma atividade cerebral acima da média. Além disso, pesquisadores da Universidade de Indiana, nos EUA, afirmam que quem exercita a gratidão diminui consideravelmente a chance de desenvolver quadros de depressão.',
	},
	leisure: {
		type: 'expanses',
		label: 'Lazer',
		max: 10,
		color: '#f97316',
		icon: (className?: string) => (
			<Smile className={cn('w-6 h-6 text-orange-400', className)} />
		),
		help: 'Se divertir também faz parte da vida, afinal!<br/>Uma boa celebração é fundamental para alimentarmos aquele sorriso no rosto e viver com mais leveza.',
	},
	'long-term': {
		type: 'expanses',
		label: 'Compras de longo prazo',
		max: 10,
		color: '#2563eb',
		icon: (className?: string) => (
			<CalendarArrowUp className={cn('w-6 h-6 text-blue-400', className)} />
		),
		help: 'Compras de Longo Prazo são aquelas que exigem planejamento.<br/>Troca de carro, compra de um imóvel, uma grande viagem. Aqui entram estes tipos de gastos que exigem um comprometimento considerável de nossas finanças.',
	},
	'personal-growth': {
		type: 'expanses',
		label: 'Desenvolvimento pessoal',
		max: 10,
		color: '#374151',
		icon: (className?: string) => (
			<GraduationCap className={cn('w-6 h-6 text-gray-400', className)} />
		),
		help: '“Corpo são, mente sã”<br/>Academia, livros, cursos, MBA, pós-graduação. O propósito de todos estes gastos é seu Desenvolvimento Pessoal. Reservar uma parte de seu orçamento para destinar a este intuito não é apenas justo, como aconselhável.',
	},
}
