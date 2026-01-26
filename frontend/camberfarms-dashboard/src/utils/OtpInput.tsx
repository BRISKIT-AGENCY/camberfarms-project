import React, { useEffect, useRef } from 'react'

interface OtpInputProps {
	numberOfDigits: number
	otp: string[]
	setOtp: React.Dispatch<React.SetStateAction<string[]>>
	isDisabled?: boolean
}

export default function OtpInput({
	numberOfDigits,
	otp,
	setOtp,
	isDisabled = false,
}: OtpInputProps) {
	const otpBoxReference = useRef<Array<HTMLInputElement | null>>([])

	const handleChange = (value: string, index: number) => {
		// Allow only digits
		const digit = value.replace(/\D/g, '')
		if (!digit) return

		const newArr = [...otp]
		newArr[index] = digit[0]
		setOtp(newArr)

		if (index < numberOfDigits - 1) {
			otpBoxReference.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === 'Backspace') {
			const newOtp = [...otp]

			if (newOtp[index]) {
				// Case 1: clear current digit
				newOtp[index] = ''
				setOtp(newOtp)
			} else if (index > 0) {
				// Case 2: move back and clear previous
				newOtp[index - 1] = ''
				setOtp(newOtp)
				otpBoxReference.current[index - 1]?.focus()
			}
		}

		if (e.key === 'ArrowLeft' && index > 0) {
			otpBoxReference.current[index - 1]?.focus()
		}

		if (e.key === 'ArrowRight' && index < numberOfDigits - 1) {
			otpBoxReference.current[index + 1]?.focus()
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const pastedData = e.clipboardData
			.getData('text')
			.replace(/\D/g, '')
			.slice(0, numberOfDigits)

		if (!pastedData) return

		const newOtp = [...otp]
		for (let i = 0; i < pastedData.length; i++) {
			newOtp[i] = pastedData[i]
		}
		setOtp(newOtp)

		const nextIndex = Math.min(pastedData.length, numberOfDigits - 1)
		otpBoxReference.current[nextIndex]?.focus()
	}

	useEffect(() => {
		otpBoxReference.current[0]?.focus()
	}, [])

	return (
		<div
			className="w-full flex items-center justify-center gap-4 relative"
			role="group"
			aria-label="One-time password input"
		>
			{otp.map((digit, index) => (
				<input
					key={index}
					ref={(ref) => {
						otpBoxReference.current[index] = ref
					}}
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					autoComplete="one-time-code"
					maxLength={1}
					value={digit}
					disabled={isDisabled}
					name={`input${index}`}
					onChange={(e) => handleChange(e.target.value, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onPaste={handlePaste}
					aria-label={`OTP digit ${index + 1} of ${numberOfDigits}`}
					className="w-12 lg:w-20 aspect-square font-bold text-xl lg:text-3xl flex items-center justify-center text-center p-3 rounded-md bg-grey/10 outline-0 border-0 border-primary caret-primary focus:border-2 focus:outline-none"
				/>
			))}
		</div>
	)
}
