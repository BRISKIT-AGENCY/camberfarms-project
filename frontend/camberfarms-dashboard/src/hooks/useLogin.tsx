import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axios'

export function useLogin() {
	return useMutation({
		mutationFn: async (data: { username: string; password: string }) => {
			const res = await axiosInstance.post('login', data)
			return res.data
		},
	})
}
