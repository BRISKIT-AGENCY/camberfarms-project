'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import axiosInstance from '../api/axios'

export default function TrackVisit() {
	const pathname = usePathname()

	useEffect(() => {
		axiosInstance
			.post('api/admin/track-visit', {
				path: pathname,
			})
			.catch(() => {})
	}, [pathname])

	return null
}
