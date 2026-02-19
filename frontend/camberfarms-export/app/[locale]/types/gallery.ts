export type GalleryImage = {
	_id: string
	createdAt: string
	updatedAt: string
	images: {
		aspectRatio: string
		height: number
		size: number
		width: number
		url: string
		uploadedAt: string
		_id: string
	}[]
}

export type GalleryImageItem = {
	aspectRatio: string
	height: number
	size: number
	width: number
	url: string
	uploadedAt: string
	_id: string
}
