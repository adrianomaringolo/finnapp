export const formatDateAndWeekday = (date: Date | string): string =>
	new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'long',
		weekday: 'long',
	}).format(new Date(date))

export const formatDateAndWeekdayAndYear = (date: Date | string): string =>
	new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'long',
		weekday: 'long',
		year: 'numeric',
	}).format(new Date(date))

export const formatLongDate = (date: Date): string =>
	new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)
