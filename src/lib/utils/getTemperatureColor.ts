export function getTemperatureColor(value: number, maxValue: number): string {
	// Ensure the value is between 0 and maxValue
	const normalizedValue = Math.min(Math.max(0, value), maxValue)
	const percentage = (normalizedValue / maxValue) * 100

	if (percentage <= 40) {
		// Green to Yellow (0% to 40%)
		const greenValue = Math.round(255 - (percentage / 40) * (255 - 235))
		return `rgb(76, ${greenValue}, 80)`
	} else if (percentage <= 60) {
		// Yellow to Orange (40% to 60%)
		const redValue = Math.round(255 - ((60 - percentage) / 20) * (255 - 235))
		return `rgb(${redValue}, 235, 59)`
	} else if (percentage <= 80) {
		// Orange to Red (60% to 80%)
		const greenValue = Math.round(152 - ((percentage - 60) / 20) * 152)
		return `rgb(255, ${greenValue}, 0)`
	} else {
		// Red (80% to 100%)
		return 'rgb(244, 67, 54)'
	}
}

// Example usage
console.log(getTemperatureColor(0, 100)) // rgb(76, 255, 80)
console.log(getTemperatureColor(40, 100)) // rgb(76, 235, 80)
console.log(getTemperatureColor(60, 100)) // rgb(255, 235, 59)
console.log(getTemperatureColor(80, 100)) // rgb(255, 0, 0)
console.log(getTemperatureColor(100, 100)) // rgb(244, 67, 54)
