export const createSlug = (text: string) =>
	text.toLowerCase().trim().replaceAll(' ', '-')
