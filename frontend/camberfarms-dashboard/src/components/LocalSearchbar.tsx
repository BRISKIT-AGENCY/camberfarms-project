import { type Dispatch, type SetStateAction } from 'react'
import searchIcon from '../assets/icon/search-icon.svg'

type SearchProps = {
	placeholder?: string
	setState: Dispatch<SetStateAction<string>>
	query: string
}

export default function LocalSearchbar({
	setState,
	query,
	placeholder = 'Search',
}: SearchProps) {
	return (
		<div className="w-full md:bg-white rounded-2xl relative dark:bg-black">
			<label className="w-full bg-white flex items-center gap-2 p-2 text-grey border border-grey rounded-xl has-[input]:focus-within:border-primary transition-all ease-in-out duration-200 dark:bg-black">
				<img
					src={searchIcon}
					alt="search"
					className="h-full aspect-square object-contain object-center"
				/>
				<input
					type="search"
					name="search"
					id="search"
					className="w-full bg-transparent outline-0 font-inter font-normal"
					placeholder={placeholder}
					value={query}
					onChange={(e) => setState(e.target.value)}
				/>
			</label>
		</div>
	)
}
