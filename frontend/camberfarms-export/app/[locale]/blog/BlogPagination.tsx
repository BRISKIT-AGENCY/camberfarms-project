import Image from 'next/image'
import Link from 'next/link'
import arrowIcon from '../assets/icon/arrow-down.svg'

export default function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number
	totalPages: number
}) {
	return (
		<div className="flex justify-center w-full mt-20 lg:mt-0 lg:absolute lg:left-1/2 lg:w-fit lg:bottom-10 lg:-translate-x-1/2">
			<div className="flex items-center gap-2 p-3 rounded-lg bg-[#F2F2F2]">
				{/* Left arrow */}
				<button className="w-10 h-10  flex items-center justify-center bg-[#ababab24] rounded-lg">
					<Image
						// width={30}
						// height={30}
						src={arrowIcon}
						alt=""
						className="w-8 aspect-square rotate-90"
					/>
				</button>

				{/* Page numbers */}
				<div className="flex gap-2">
					{Array.from({ length: totalPages }).map((_, i) => {
						const page = i + 1

						return (
							<Link
								key={page}
								href={`/blog?page=${page}`}
								className={`w-6 h-6 sm:w-10 sm:h-10 md:text-[14px] flex items-center justify-center rounded-lg border hover:bg-primary/40
                  ${
										page === currentPage
											? 'bg-[#1AD329] text-white border-none'
											: ' text-[#999999] border-none'
									}
                `}
							>
								{page}
							</Link>
						)
					})}
				</div>

				{/* Right arrow */}
				<button className="w-10 h-10  flex items-center justify-center bg-primary/50 rounded-lg">
					<Image
						// width={30}
						// height={30}
						src={arrowIcon}
						alt=""
						className="w-8 aspect-square -rotate-90 fill-primary"
					/>
				</button>
			</div>
		</div>
	)
}
