export type AffiliateStatus = 'rejected' | 'pending' | 'approved'

export type Affiliate = {
	aboutCommission: string
	aboutInterest: string
	buyerCountry: string
	buyerProduct: string
	city: string
	country: string
	createdAt: string
	email: string
	fullName: string
	haveABuyer: 'yes' | 'no'
	phone: string
	productVolume: string
	referralPlatform: string
	referralPlatformOthers: string
	status: AffiliateStatus
	understandTerms: 'yes' | 'no'
	_id: string
}

export type AffiliateReply = {
	approvedPercentage: number
	success: boolean
	totalApproved: number
	totalForms: number
}

export type AffiliatePending = {
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

export type NewReplies = {
	success: boolean
	totalNewMessages: number
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

export type AffiliateApproved = {
	success: boolean
	totalForms: number
	weeklyBreakdown: {
		total: number
		_id: {
			month: number
			year: number
		}
	}[]
}
