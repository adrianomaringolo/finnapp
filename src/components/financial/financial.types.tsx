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
		icon: <CircleDollarSign className="w-6 h-6 text-green-500" />,
	},
	essential: {
		type: 'expanses',
		label: 'Necessidades essenciais',
		icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
	},
	leisure: {
		type: 'expanses',
		label: 'Lazer',
		icon: <Smile className="w-6 h-6 text-red-500" />,
	},
	charity: {
		type: 'expanses',
		label: 'Fazer pelo outro',
		icon: <Heart className="w-6 h-6 text-red-500" />,
	},
	'financial-security': {
		type: 'expanses',
		label: 'Tranquilidade financeira',
		icon: <Sun className="w-6 h-6 text-orange-500" />,
	},
	'long-term': {
		type: 'expanses',
		label: 'Compras de longo prazo',
		icon: <CalendarArrowUp className="w-6 h-6 text-blue-950" />,
	},
	'personal-growth': {
		type: 'expanses',
		label: 'Desenvolvimento pessoal',
		icon: <GraduationCap className="w-6 h-6 text-gray-800" />,
	},
}
