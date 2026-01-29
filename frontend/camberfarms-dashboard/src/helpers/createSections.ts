export const createSections = (text: string) => ({
	paragraphs: text
		.split(/\r?\n+/)
		.map((p) => p.trim())
		.filter(Boolean),
})
