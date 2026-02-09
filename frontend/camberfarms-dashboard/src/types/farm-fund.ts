export type FarmFundEnquiry = {
	name: string
	email: string
	country: string
	status: 'new' | 'pending' | 'replied'
	createdAt: string
	_id: string | number
	residence: string
	message?: string
	phone: string
	category: string
	adminReply: string
}

export type FarmFundReply = {
	percentage: number
	success: boolean
	repliedForms: number
	totalForms: number
}

export type FarmFundPending = {
	success: boolean
	totalPendingReplies: number
	weeklyBreakdown: {
		month: number
		year: number
		pending: number
		percentage: number
		total: number
		_id: {
			month: number
			year: number
		}
	}[]
}

export type FarmFundNewReplies = {
	success: boolean
	totalNewMessages: number
	monthlyBreakdown: {
		month: number
		year: number
		pending: number
		percentage: number
		total: number
		_id: {
			month: number
			year: number
		}
	}[]
}

export type FarmFundApproved = {
	success: boolean
	totalApprovedInvestors: number
	monthlyBreakdown: {
		total: number
		_id: {
			month: number
			year: number
		}
	}[]
}
