/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axios'

export function useRequestOTP(onSuccesscb?: () => void) {
	return useMutation({
		mutationFn: async (data: { email: string }) => {
			const res = await axiosInstance.post('forgot-password/request-otp', data)
			return res.data
		},
		onSuccess: () => {
			// console.info('send otp: ', data)
			onSuccesscb?.()
		},
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message || 'Unable to send verification codes',
			)
		},
	})
}
