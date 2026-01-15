'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="w-full relative min-h-screen flex flex-col justify-center items-center text-dark-grey">
			<div className="w-full flex gap-4 flex-col items-center justify-center pt-20 px-10 pb-10">
				<h1 className="text-4xl font-poppins font-bold text-secondary">
					Oops!
				</h1>
				<p>Something went wrong.</p>
				<button
					type="button"
					onClick={() => reset()}
					className="w-fit mx-auto flex items-center px-6 py-2 rounded-full capitalize bg-primary text-white text-base font-poppins font-medium mt-5 hover:bg-primary/70 transition-colors duration-200 cursor-pointer"
				>
					Try again
				</button>
			</div>
		</div>
	)
}
