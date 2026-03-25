'use client'

import Image from 'next/image'
import { useState } from 'react'

type ImageProps = {
	src: string
	alt: string
}

export default function ImageWithFallback({ src, alt }: ImageProps) {
	// const [imgSrc, setImgSrc] = useState(
	// 	`https://api.camberfarms.org/${src.replace(/^\//, '')}`
	// )
	const [hasError, setHasError] = useState(false)

	if (hasError) return null

	return (
		<Image
			src={`https://api.camberfarms.org/${src.replace(/^\//, '')}`}
			alt={alt}
			fill
			loading="lazy"
			className="object-cover object-center z-5"
			sizes="(max-width: 768px) 30vw, (max-width: 1280px) 50vw, 33vw"
			onError={() => setHasError(true)}
		/>
	)
}
