export function exportToPDF(
	url: string | undefined,
	name: string = 'camberfarms',
) {
	if (!url) return
	const date = Date.now()
	// create link
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', `${name}-${date}.pdf`)
	document.body.appendChild(link)
	link.click()
	// cleanup
	link.remove()
	window.URL.revokeObjectURL(url)
}
