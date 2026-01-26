import { useEffect, useRef, useState } from 'react'

interface UseOtpTimerOptions {
	duration: number // in seconds
	onExpire?: () => void
}

export function useOtpTimer({ duration, onExpire }: UseOtpTimerOptions) {
	const [timeLeft, setTimeLeft] = useState(duration)
	const [isExpired, setIsExpired] = useState(false)
	const savedOnExpire = useRef(onExpire)

	useEffect(() => {
		savedOnExpire.current = onExpire
	}, [onExpire])

	useEffect(() => {
		if (isExpired) return

		const timerId = setTimeout(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					setIsExpired(true)
					savedOnExpire.current?.()
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearTimeout(timerId)
	}, [timeLeft, isExpired])

	const resetTimer = () => {
		setIsExpired(false)
		setTimeLeft(duration)
	}

	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60

	return {
		timeLeft,
		minutes,
		seconds,
		isExpired,
		resetTimer,
	}
}
