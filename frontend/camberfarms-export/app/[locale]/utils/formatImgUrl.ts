export function formatImgUrl(url: string | undefined) {
	return !url ? '' : `https://camberfarms-project.onrender.com${url}`
}
