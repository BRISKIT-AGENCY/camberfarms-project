export default function BlogPagination() {
	return (
		<div className="w-fitv mx-auto mt-10 md:mb-10 flex items-center md:absolute md:left-1/2 md:-translate-1/2 bottom-0 bg-light-green/40 rounded-2xl">
			{numbers.map((n) => (
				<button
					type="button"
					key={n}
					className="w-12 aspect-square p-4 text-sm font-medium text-grey"
				>
					{n}
				</button>
			))}
		</div>
	)
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
