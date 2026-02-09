export type Blog = {
	createdAt: string
	website: 'africa' | 'export'
	views?: number
	image: string
	publishedAt: string
	slug: string
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
	updatedAt?: string
	_id: string
}
export interface BlogSection {
	heading?: string
	paragraphs: string[]
}

export interface CreateBlogFormValues {
	title: string
	publishedAt: string
	body: string
	image: FileList | null
}
