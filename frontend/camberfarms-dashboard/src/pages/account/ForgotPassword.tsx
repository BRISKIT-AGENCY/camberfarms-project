import { useState } from 'react'
import { Link } from 'react-router-dom'
import closeIcon from '../../assets/icon/close.svg'
import OverlayWrapper from '../../components/OverlayWrapper'
import { maskNumber } from '../../helpers/maskNumber'
import { useGoBack } from '../../hooks/useGoBack'
import { useOtpTimer } from '../../hooks/useOtpTimer'
import OtpInput from '../../utils/OtpInput'

const numberOfDigits = 5

export default function ForgotPassword() {
	const goBack = useGoBack('account')
	const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(''))
	// const disableSubmit = otp.some((input) => input === '')
	const phoneNumber = maskNumber('+2348057978966')
	const { minutes, seconds, isExpired, resetTimer } = useOtpTimer({
		duration: 120,
	})

	return (
		<OverlayWrapper fullWidth={false}>
			<div className="w-md pb-4 px-2 flex flex-col gap-2 bg-white text-black relative text-center dark:bg-black dark:text-white">
				<img
					src={closeIcon}
					className="w-10 aspect-square absolute top-0 right-0 cursor-pointer"
					alt="close"
					onClick={goBack}
				/>
				<h6 className="text-2xl font-bold font-poppins text-start">
					Verify phone number
				</h6>
				<p className="text-sm text-grey dark:text-light-grey mt-6 mb-8">
					Enter the{' '}
					<strong className="text-black dark:text-white">
						{numberOfDigits} digits code
					</strong>{' '}
					sent to your phonev number
					<br />
					<strong className="text-black">{phoneNumber}</strong> below.
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
							className="text-primary font-bold cursor-pointer"
							onClick={resetTimer}
						>
							Resend code
						</button>
					</p>
				)}
				<Link
					to={'/account/reset-password'}
					// disabled={disableSubmit}
					className="w-full text-center bg-primary text-white py-2 px-6 font-medium font-poppins text-lg cursor-pointer rounded-lg disabled:opacity-30"
				>
					Continue
				</Link>
			</div>
		</OverlayWrapper>
	)
}
