export function maskEmail(email: string) {
	const arr = email.split('@')
	const firstNum = arr[0].slice(0, 1)
	// const lastNum = arr.slice(-2)

	return [...firstNum, '****@', ...arr[1]]
}
