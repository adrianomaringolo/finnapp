/* eslint-disable @typescript-eslint/no-explicit-any */
// Function to convert a string from snake_case to camelCase
function snakeToCamel(snakeStr: string): string {
	return snakeStr.replace(/(_\w)/g, (match) => match[1].toUpperCase())
}

// Function to convert a string from camelCase to snake_case
function camelToSnake(camelStr: string): string {
	return camelStr.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`)
}

// Recursive function to handle objects, arrays, and primitive values for snake_case to camelCase
export function objectToCamel<T>(obj: T): T {
	if (Array.isArray(obj)) {
		return obj.map((item) => objectToCamel(item)) as unknown as T
	} else if (obj !== null && typeof obj === 'object') {
		const newObj: any = {}
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const camelKey = snakeToCamel(key)
				newObj[camelKey] = objectToCamel((obj as any)[key])
			}
		}
		return newObj as T
	}
	return obj
}

// Recursive function to handle objects, arrays, and primitive values for camelCase to snake_case
export function objectToSnake<T>(obj: T): T {
	if (Array.isArray(obj)) {
		return obj.map((item) => objectToSnake(item)) as unknown as T
	} else if (obj !== null && typeof obj === 'object') {
		const newObj: any = {}
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const snakeKey = camelToSnake(key)
				newObj[snakeKey] = objectToSnake((obj as any)[key])
			}
		}
		return newObj as T
	}
	return obj
}
