type CardItemProps = {
	title?: string
	image?: string
	flag?: string
	flagColor?: string
	children: React.ReactNode
	primaryBtnText: string
	primaryBtnClick: () => void
	secondaryBtnText: string
	secondaryBtnClick: () => void
	cardVariant?: string
}

export default function CardItem({
	title,
	image,
	children,
	flag,
	flagColor = 'black',
	primaryBtnText,
	primaryBtnClick,
	secondaryBtnText,
	secondaryBtnClick,
	cardVariant,
}: CardItemProps) {
	return (
		<div
			className={`w-full flex flex-col relative shadow-2xs bg-white text-black rounded-xl ${cardVariant}`}
		>
			{image && (
				<img
					src={image}
					className="w-full object-fill object-center h-55 rounded-t-xl pb-2"
				/>
			)}
			{flag && (
				<p
					className="font-poppins text-sm px-2 py-1 rounded-2xl absolute top-4 right-4 capitalize"
					style={{ color: flagColor, backgroundColor: `${flagColor}20` }}
				>
					{flag}
				</p>
			)}
			{title && (
				<h4 className="text-lg font-poppins font-semibold text-black p-2 capitalize">
					{title}
				</h4>
			)}
			{children}
			<div className="w-full px-2 py-4 mt-auto flex flex-nowrap items-center justify-center gap-6 font-poppins font-semibold text-base">
				<button
					type="button"
					onClick={primaryBtnClick}
					className="bg-primary text-white py-2 px-10 cursor-pointer rounded-xl capitalize"
				>
					{primaryBtnText}
				</button>
				<button
					type="button"
					onClick={secondaryBtnClick}
					className="bg-red-500/15 text-red-500 py-2 px-10 cursor-pointer rounded-xl capitalize"
				>
					{secondaryBtnText}
				</button>
			</div>
		</div>
	)
}
