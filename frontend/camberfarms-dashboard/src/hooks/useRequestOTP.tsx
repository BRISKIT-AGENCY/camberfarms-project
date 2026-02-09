import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'

export function useRequestOTP() {
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async () => {
			const res = await axiosInstance.post('reset-password/request-otp')
			return res.data
		},
		onSuccess: (data) => {
			navigate('/account/iforgot', { state: { reset: data } })
		},
	})
}
