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
	_id: string
	heading?: string
	paragraphs: string[]
}

export interface CreateBlogFormValues {
	title: string
	publishedAt: string
	image: FileList | null
	excerpt: string
	sections: BlogSection[]
}

export interface UpdateBlogFormValues {
	title: string
	publishedAt: string
	excerpt: string
	image: FileList | null
	sections: BlogSection[]
}
