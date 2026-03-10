export type MembershipStatus = 'reject' | 'pending' | 'approved'

export type Membership = {
	name: string
	email: string
	country: string
	status: MembershipStatus
	createdAt: string
	_id: string | number
	gender: 'male' | 'female'
	state: string
	region: string
	phone: string
	dateOfBirth: string
	idFiles: string[]
	address: string
	updatedAt: string
}

export type MembershipReply = {
	approvedPercentage: number
	success: boolean
	totalApproved: number
	totalForms: number
}

export type MembershipPending = {
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

export type MembershipNewReplies = {
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

export type MembershipApproved = {
	success: boolean
	totalForms: number
	monthlyBreakdown: {
		total: number
		_id: {
			month: number
			year: number
		}
	}[]
}
