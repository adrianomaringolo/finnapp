import {
	CalendarArrowUp,
	CircleDollarSign,
	GraduationCap,
	Heart,
	ShoppingCart,
	Smile,
	Sun,
} from 'lucide-react'

export interface Transaction {
	id: string
	type: TransactionType
	description: string
	amount: number
	date: string
}

type TransactionType = keyof typeof TransactionTypes

export const TransactionTypes = {
	income: {
		label: 'Receita',
		icon: <CircleDollarSign className="w-6 h-6 text-green-500" />,
	},
	essential: {
		label: 'Necessidades essenciais',
		icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
	},
	leisure: { label: 'Lazer', icon: <Smile className="w-6 h-6 text-red-500" /> },
	charity: {
		label: 'Fazer pelo outro',
		icon: <Heart className="w-6 h-6 text-red-500" />,
	},
	'financial-security': {
		label: 'Tranquilidade financeira',
		icon: <Sun className="w-6 h-6 text-orange-500" />,
	},
	'long-term': {
		label: 'Compras de longo prazo',
		icon: <CalendarArrowUp className="w-6 h-6 text-blue-950" />,
	},
	'personal-growth': {
		label: 'Desenvolvimento pessoal',
		icon: <GraduationCap className="w-6 h-6 text-gray-800" />,
	},
}
