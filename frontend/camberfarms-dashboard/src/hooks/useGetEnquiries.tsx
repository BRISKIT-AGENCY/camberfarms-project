import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../api/axios'
import type { Enquiry } from '../types/enquiry'

export default function useGetEnquiries() {
	return useQuery({
		queryKey: ['enquiries'],
		queryFn: async () => {
			const res = await axiosInstance.get('enquiries')
			return res.data as {
				totalEnquiries: number
				success: boolean
				enquiries: Enquiry[]
				monthlyStats: {
					changeFromPreviousMonth: number | null
					changePercentage: number | null
					month: number
					total: number
					year: number
				}
			}
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
}
