export type News = {
	createdAt: string
	image: string
	publishedAt: string
	sections: string[]
	slug: string
	updateAt: string
	viewCount?: number
	_id: string
	translations: {
		en: {
			excerpt: string
			title: string
			sections: {
				heading: string
				paragraphs: string[]
				_id: string
			}[]
		}
	}
}
