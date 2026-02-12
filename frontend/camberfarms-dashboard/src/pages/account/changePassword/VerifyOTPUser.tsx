import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axios'
import closeIcon from '../../../assets/icon/close.svg'
import OverlayWrapper from '../../../components/OverlayWrapper'
import { maskEmail } from '../../../helpers/maskEmail'
import { useAuth } from '../../../hooks/useAuth'
import { useOtpTimer } from '../../../hooks/useOtpTimer'
import { useRequestOTPUser } from '../../../hooks/useRequestOTPUser'
import OtpInput from '../../../utils/OtpInput'

const numberOfDigits = 6

export default function VerifyOTPUser() {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { mutateAsync, isPending, error } = useRequestOTPUser()
	const goBack = () => navigate('/account')
	const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(''))
	const maskedEmail = maskEmail(user!.email)
	const { minutes, seconds, isExpired, resetTimer } = useOtpTimer({
		duration: 600,
	})

	const { mutate, isPending: verifyingOTP } = useMutation({
		mutationFn: async (data: { otp: string }) => {
			await axiosInstance.post('reset-password/verify-otp', data)
		},
		onSuccess: () => navigate('/account/user/reset-password'),
	})
	const disableSubmit =
		otp.some((input) => input === '') || Boolean(error) || verifyingOTP

	async function requestNewOTP() {
		await mutateAsync()
		resetTimer()
	}

	function verifyOTP() {
		mutate({ otp: otp.join('') })
	}

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
				{!isExpired && (
					<p className="text-sm text-grey dark:text-light-grey mt-4 mb-6">
						Code expires in{' '}
						<strong className="text-black dark:text-white">
							{minutes}:{seconds}s
						</strong>
					</p>
				)}
				{isExpired && (
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
				)}
				<button
					type="button"
					onClick={verifyOTP}
					disabled={disableSubmit}
					className="w-full text-center bg-primary text-white py-2 px-6 font-medium font-poppins text-lg cursor-pointer rounded-lg disabled:opacity-30"
				>
					Continue
				</button>
			</div>
		</OverlayWrapper>
	)
}
