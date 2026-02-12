import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'

export function useRequestOTPUser(onSuccesscb?: () => void) {
	// const navigate = useNavigate()
	return useMutation({
		mutationFn: async () => {
			const res = await axiosInstance.post('reset-password/request-otp')
			return res.data
		},
		onSuccess: () => {
			// loggedin otp verify page
			// navigate('/account/user/verification')
			onSuccesscb?.()
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message || 'Unable to send verification codes',
			)
		},
	})
}
