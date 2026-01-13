import Image, { StaticImageData } from 'next/image'

type ProductInfoProps = {
	name: string
	images: string[] | StaticImageData[]
	desc: string
	info?: string[]
}

export default function ProductInfo({
	name,
	images,
	desc,
	info,
}: ProductInfoProps) {
	return (
		<article className="w-full mt-20">
			<h1 className="w-full p-10 capitalize text-center font-poppins font-bold text-2xl md:text-3xl bg-grey text-white mb-10">
				{name}
			</h1>
			<div className="w-full px-10 lg:px-14 xl:px-20 py-6 text-grey">
				<div className="w-full flex items-center gap-6 flex-wrap mb-6">
					{images.map((img, index) => (
						<Image
							src={img}
							alt={name}
							width={520}
							height={500}
							key={index}
							className="w-full flex-1 md:w-1/2 h-87.5 md:h-105 lg:h-130 object-center object-cover"
						/>
					))}
				</div>
				<h5 className="font-poppins capitalize font-semibold text-black text-xl sm:text-2xl mb-4">
					{name}
				</h5>
				<p>{desc}</p>
				<ol className="w-full flex flex-col gap-2 mt-4">
					{info &&
						info.map((item, index) => (
							<li key={index} className="text-sm marker:hidden">
								- {item}
							</li>
						))}
				</ol>
			</div>
		</article>
	)
}
