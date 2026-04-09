'use client'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { GalleryImage } from '../types/gallery'

export default function useGetGalleries() {
	const [data, setData] = useState<GalleryImage[] | null>(null)
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()
		async function getImages() {
			setIsPending(true)
			setError(null)
			try {
				const res = await axiosInstance.get('api/gallery', {
					signal: controller.signal,
				})
				const result = res.data as {
					success: boolean
					total: number
					galleries: GalleryImage[]
				}
				// console.log('gallery: ', result.galleries)
				setData(result.galleries)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				if (err.name == 'CanceledError') return

				console.error('fetch error: ', err)
				setError(err)
			} finally {
				setIsPending(false)
			}
		}
		getImages()

		return () => {
			controller.abort()
		}
	}, [])

	return { data, isPending, error }
}
