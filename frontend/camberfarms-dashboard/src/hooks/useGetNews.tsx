import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../api/axios'
import type { News } from '../types/news'

export default function useGetNews() {
	return useQuery({
		queryKey: ['news'],
		queryFn: async () => {
			const res = await axiosInstance.get('news')
			return res.data as {
				total: number
				success: boolean
				news: News[]
			}
		},
	})
}
