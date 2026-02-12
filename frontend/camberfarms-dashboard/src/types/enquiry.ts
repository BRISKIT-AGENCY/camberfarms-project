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
	updatedAt: string
	_id: string
}

export type ResolutionRate = {
	resolutionPercentage: number
	success: boolean
	totalEnquiries: number
	totalResolved: number
}

export type ResponseTime = {
	weeklyResponseTime: {
		week: number
		total: number
		year: number
	}[]
	success: boolean
}

export type TotalApproved = {
	success: boolean
	totalEnquiries: number
	monthlyBreakdowns: {
		month: number
		total: number
		year: number
	}[]
}

export type TotalPending = {
	success: boolean
	totalPendingReplies: number
	weeklyBreakdowns: {
		week: number
		total: number
		year: number
	}[]
}
