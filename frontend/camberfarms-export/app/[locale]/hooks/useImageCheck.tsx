'use client'

import { useEffect, useState } from 'react'

export function useImageCheck(url: string) {
	const [isValid, setIsValid] = useState<boolean | null>(url ? null : false)

	useEffect(() => {
		if (!url) return

		let isMounted = true
		const img = new window.Image()

		img.onload = () => {
			if (isMounted) setIsValid(true)
		}

		img.onerror = () => {
			if (isMounted) setIsValid(false)
		}

		img.src = `https://api.camberfarms.org/${url.replace(/^\//, '')}`

		return () => {
			isMounted = false
		}
	}, [url])

	return isValid
}
