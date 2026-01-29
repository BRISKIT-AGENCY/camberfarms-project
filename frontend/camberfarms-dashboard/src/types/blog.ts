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
