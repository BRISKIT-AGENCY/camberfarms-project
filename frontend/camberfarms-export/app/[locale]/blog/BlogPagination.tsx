'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import arrowIcon from '../assets/icon/arrow-down.svg'

export default function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number
	totalPages: number
}) {
	const { page } = useParams()

	// an IIFE returning the next page
	const nextPage = (() => {
		// let page = 1
		if (currentPage < totalPages) {
			return currentPage + 1
		} else {
			return totalPages - 1
		}
	})()
	// an IIFE returning the previous page
	const prevPage = (() => {
		if (currentPage === 1) {
			return 1
		} else {
			return currentPage - 1
		}
	})()

	return (
		<div className="flex justify-center w-full mt-20 lg:mt-0 lg:absolute lg:left-1/2 lg:w-fit lg:bottom-10 lg:-translate-x-1/2">
			<div className="flex items-center gap-2 p-3 rounded-lg bg-[#F2F2F2]">
				{/* Left arrow */}
				<Link
					href={`/blog?page=${prevPage}`}
					className="w-10 h-10  flex items-center justify-center bg-[#ababab24] rounded-lg"
				>
					<Image
						// width={30}
						// height={30}
						src={arrowIcon}
						alt=""
						className="w-8 aspect-square rotate-90"
					/>
				</Link>

				{/* Page numbers */}
				<div className="flex gap-2">
					{Array.from({ length: totalPages }).map((_, i) => {
						const p = i + 1

						return (
							<Link
								key={p}
								href={`/blog?page=${p}`}
								className={`w-6 h-6 sm:w-10 sm:h-10 md:text-[14px] flex items-center justify-center rounded-lg border hover:bg-primary/40
                  ${
										p === (currentPage || page)
											? 'bg-[#1AD329] text-white border-none'
											: ' text-[#999999] border-none'
									}
                `}
							>
								{p}
							</Link>
						)
					})}
				</div>

				{/* Right arrow */}
				<Link
					href={`/blog?page=${nextPage}`}
					className="w-10 h-10  flex items-center justify-center bg-primary/50 rounded-lg cursor-pointer"
				>
					<Image
						// width={30}
						// height={30}
						src={arrowIcon}
						alt=""
						className="w-8 aspect-square -rotate-90 fill-primary"
					/>
				</Link>
			</div>
		</div>
	)
}
