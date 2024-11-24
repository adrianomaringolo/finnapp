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
		icon: <CircleDollarSign className="w-6 h-6 text-green-500" />,
	},
	essential: {
		type: 'expanses',
		label: 'Necessidades essenciais',
		max: 55,
		color: '#60a5fa',
		icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
	},
	leisure: {
		type: 'expanses',
		label: 'Lazer',
		max: 10,
		color: '#f97316',
		icon: <Smile className="w-6 h-6 text-orange-500" />,
	},
	charity: {
		type: 'expanses',
		label: 'Fazer pelo outro',
		max: 5,
		color: '#ec4899',
		icon: <Heart className="w-6 h-6 text-pink-500" />,
	},
	'financial-security': {
		type: 'expanses',
		label: 'Tranquilidade financeira',
		max: 10,
		color: '#ca8a04',
		icon: <Sun className="w-6 h-6 text-yellow-600" />,
	},
	'long-term': {
		type: 'expanses',
		label: 'Compras de longo prazo',
		max: 10,
		color: '#2563eb',
		icon: <CalendarArrowUp className="w-6 h-6 text-blue-600" />,
	},
	'personal-growth': {
		type: 'expanses',
		label: 'Desenvolvimento pessoal',
		max: 10,
		color: '#374151',
		icon: <GraduationCap className="w-6 h-6 text-gray-700" />,
	},
}
