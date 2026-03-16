export function formatImgUrl(url: string | undefined) {
	return !url ? '' : `https://api.camberfarms.org/${url}`
}
