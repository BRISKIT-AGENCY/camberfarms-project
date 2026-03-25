import Image from 'next/image'
import { useImageCheck } from '../../hooks/useImageCheck'
import { Product } from '../../types/product'

type ProductInfoProps = {
	product: Product | null
}

export default function ProductInfo({ product }: ProductInfoProps) {
	const imgWorking = useImageCheck(product?.images?.[0] || '')
	if (!product) return null

	return (
		<article className="w-full mt-20">
			<h1 className="w-full p-10 capitalize text-center font-poppins font-bold text-2xl md:text-3xl bg-grey text-white mb-10">
				{product?.name}
			</h1>
			<div className="w-full px-10 lg:px-14 xl:px-20 py-6 text-grey">
				{imgWorking && (
					<div className="w-full flex items-center gap-6 flex-wrap mb-6 border border-primary/50 rounded-sm">
						{product?.images.map((img, index) => (
							<Image
								src={`https://api.camberfarms.org/${img}`}
								alt={product?.name}
								sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
								width={520}
								height={500}
								key={index}
								className="w-full flex-1 md:w-1/2 h-87.5 md:h-105 lg:h-130 object-center object-cover"
							/>
						))}
					</div>
				)}
				<h5 className="font-poppins capitalize font-semibold text-black text-xl sm:text-2xl mb-4">
					{product?.name}
				</h5>
				<p>{product?.description}</p>
				<ol className="w-full flex flex-col gap-2 mt-4">
					{product?.variants &&
						typeof product.variants === 'object' &&
						Object.entries(product?.variants).map(([key, value]) => (
							<li key={key} className="text-sm marker:hidden">
								<p className="w-full flex gap-1">
									<span className="text-grey text-sm capitalize">- {key}:</span>
									<strong>{String(value)}</strong>
								</p>
							</li>
						))}
				</ol>
			</div>
		</article>
	)
}
