export type NotificationProps = {
	iconName: string
	title: string
	desc: string
	Icolor: string
	id: string | number
	time?: string
	round?: string
}

export type Notification = {
	createdAt: string
	date: string
	description: string
	isRead: boolean
	link: string
	sourceWebsite: 'export' | 'africa'
	title: string
	type: string
	updatedAt: string
	_id: string
}
