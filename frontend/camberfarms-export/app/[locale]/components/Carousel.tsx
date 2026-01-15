'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import arrowIcon from '../assets/icon/arrow-r-black.svg'

type CarouselProps = {
	children: React.ReactNode[]
	autoplayInterval?: number
}
export default function Carousel({
	children,
	autoplayInterval = 100,
}: CarouselProps) {
	const [current, setCurrent] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const touchStart = useRef<number | null>(null)

	const prev = () => setCurrent((c) => (c === 0 ? children.length - 1 : c - 1))
	const next = () => setCurrent((c) => (c === children.length - 1 ? 0 : c + 1))

	// autoplay
	useEffect(() => {
		if (isPaused) return

		const interval = setInterval(next, autoplayInterval)

		return clearInterval(interval)
	}, [current, isPaused, autoplayInterval])

	// swipe
	const onTouchStart = (e: React.TouchEvent) => {
		touchStart.current = e.touches[0].clientX
	}

	const onTouchEnd = (e: React.TouchEvent) => {
		if (!touchStart.current) return

		const diff = touchStart.current - e.changedTouches[0].clientX
		if (diff > 50) next()
		if (diff < 50) prev()

		touchStart.current = null
	}

	return (
		<div
			className="w-full flex relative mx-auto overflow-x-hidden"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			<div
				className="flex gap-2 w-full transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${current * 99}%)` }}
			>
				{children.map((item) => (
					<>{item}</>
				))}
			</div>
			<button
				type="button"
				className="w-fit absolute top-1/2 left-0 -translate-y-1/2 z-5 bg-dark-grey/29 rounded-full p-2 cursor-pointer"
				onClick={prev}
			>
				<Image
					src={arrowIcon}
					alt="prev"
					width={10}
					height={10}
					className="w-10 aspect-square rotate-180"
				/>
			</button>
			<button
				type="button"
				className="w-fit absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-dark-grey/29 rounded-full p-2 cursor-pointer"
				onClick={next}
			>
				<Image
					src={arrowIcon}
					alt="next"
					width={10}
					height={10}
					className="w-10 aspect-square"
				/>
			</button>
		</div>
	)
}
