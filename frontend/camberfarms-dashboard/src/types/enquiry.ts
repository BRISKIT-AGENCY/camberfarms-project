export type Enquiry = {
	adminReply: string
	createdAt: string
	email: string
	message: string
	name: string
	phone: string
	source: 'africa' | 'export'
	sourceModel: string
	status: 'pending' | 'read'
}
