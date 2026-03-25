'use client'

// import Image from 'next/image'
import Link from 'next/link'
import ImageWithFallback from '../components/ImageWithFallback'

type ProductProps = {
	name: string
	img: string
	content: string
	_id: string
}

export default function ProductItem({ name, img, content, _id }: ProductProps) {
	return (
		<article className="w-full flex flex-col md:odd:flex-row md:even:flex-row-reverse items-center justify-center gap-0.5 group">
			<div className="w-full md:w-1/2 min-h-45 md:min-h-65 p-3 sm:p-6 rounded-tl-[50px] rounded-br-[50px] flex flex-col items-center justify-evenly gap-3 text-center text-white group-odd:bg-primary group-even:bg-secondary">
				<h5 className="font-poppins font-bold text-center text-2xl md:text-3xl capitalize">
					{name}
				</h5>
				<p className="text-xs sm:text-base text-center md:w-4/5">{content}</p>
				<Link
					href={`products/${_id}#quotation`}
					className="w-fit py-3 px-6 rounded-4xl bg-white text-black capitalize font-poppins font-semibold text-lg border group-odd:border-secondary group-even:border-primary"
				>
					Get a quote
				</Link>
			</div>
			<div className="w-full md:w-1/2 h-45 md:h-80 border-2 border-primary relative group-odd:bg-secondary/10 group-even:bg-primary/10">
				<p className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-0 text-2xl font-poppins capitalize w-fit">
					{name}
				</p>
				<ImageWithFallback
					src={img}
					alt={name}
					// fill
					// placeholder="blur"
					// className="object-cover object-center"
				/>
			</div>
		</article>
	)
}
