export function maskNumber(number: string) {
	const arr = number.split('')
	const firstNum = arr.slice(0, -6)
	const lastNum = arr.slice(-2)

	return [...firstNum, '****', ...lastNum]
}
