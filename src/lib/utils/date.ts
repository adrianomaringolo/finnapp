export const formatDateAndWeekday = (date: Date | string): string =>
	new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'long',
		weekday: 'long',
	}).format(new Date(date))
