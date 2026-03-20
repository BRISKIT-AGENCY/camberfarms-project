import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'
import closeIcon from '../assets/icon/close.svg'
import OverlayWrapper from '../components/OverlayWrapper'
import { maskEmail } from '../helpers/maskEmail'
// import { useGoBack } from '../../../hooks/useGoBack'
// import { useOtpTimer } from '../hooks/useOtpTimer'
// import { useRequestOTP } from '../hooks/useRequestOTP'
import Cookies from 'js-cookie'
import { useAuth } from '../hooks/useAuth'
import OtpInput from '../utils/OtpInput'
// import type { User } from '../context/AuthContext'

const numberOfDigits = 6

export default function VerifyLoginOTP() {
	const navigate = useNavigate()
	const goBack = () => navigate('/login')
	const { dispatch } = useAuth()
	const location = useLocation()
	const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(''))
	const [error, setError] = useState('')
	const email = location.state?.email
	// const { mutateAsync, isPending, error } = useRequestOTP()
	// const { minutes, seconds, isExpired, } = useOtpTimer({
	// 	duration: 600,
	// })

	const { mutate, isPending: verifyingOTP } = useMutation({
		mutationFn: async (data: { otp: string; email: string }) => {
			const res = await axiosInstance.post('login/verify-otp', data)
			return res.data
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onSuccess: (res: any) => {
			// const userInfo = res.data

			dispatch({ type: 'LOGIN', token: res?.token, user: res.admin })
			Cookies.set('token', res.token, { expires: 1 / 12 })
			localStorage.setItem('user', JSON.stringify(res.admin))
			// console.log('user: ', userInfo)
			navigate('/')
			// naive fix for preflight authentication
			window.location.reload()
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (err: any) => {
			console.error('otp error: ', error)
			setError(err.response?.data?.message || 'Unable to verify otp')
		},
	})

	if (!email) {
		navigate('/login')
		return null
	}
	const maskedEmail = maskEmail(email)
	const disableSubmit = otp.some((input) => input === '') || verifyingOTP

	function verifyOTP() {
		mutate({ email, otp: otp.join('') })
	}

	// async function requestNewOTP() {
	// 	await mutateAsync({ email })
	// 	resetTimer()
	// }

	return (
		<OverlayWrapper fullWidth>
			<div className="w-full pb-4 pt-8 px-2 flex flex-col items-center justify-center gap-2 bg-white text-black relative text-center dark:bg-black dark:text-white">
				<img
					src={closeIcon}
					className="w-10 aspect-square absolute top-0 right-0 cursor-pointer"
					alt="close"
					onClick={goBack}
				/>
				<h6 className="text-2xl font-bold font-poppins text-start">
					Verify email address
				</h6>
				<p className="text-sm text-grey dark:text-light-grey mt-6 mb-8">
					Enter the{' '}
					<strong className="text-black dark:text-white">
						{numberOfDigits} digits code
					</strong>{' '}
					sent to your admin email address
					<br />
					<strong className="text-black">{maskedEmail}</strong> below.
				</p>
				<OtpInput
					otp={otp}
					setOtp={setOtp}
					numberOfDigits={numberOfDigits}
					// isDisabled={isExpired}
				/>
				{/* {!isExpired && (
					<p className="text-sm text-grey dark:text-light-grey mt-4 mb-6">
						Code expires in{' '}
						<strong className="text-black dark:text-white">
							{minutes}:{seconds}s
						</strong>
					</p>
				)} */}
				{/* {isExpired && (
					<p className="text-sm text-grey mt-4 mb-6">
						Didn't receive OTP?{' '}
						<button
							type="button"
							disabled={isPending}
							className="text-primary font-bold cursor-pointer"
							onClick={async () => await requestNewOTP()}
						>
							Resend code
						</button>
					</p>
				)} */}
				{error && <p className="text-red-400 py-4">{error}</p>}
				<button
					type="button"
					onClick={verifyOTP}
					disabled={disableSubmit}
					className="w-full text-center bg-primary text-white py-2 px-6 mt-4 font-medium font-poppins text-lg cursor-pointer rounded-lg disabled:opacity-30"
				>
					Continue
				</button>
			</div>
		</OverlayWrapper>
	)
}
