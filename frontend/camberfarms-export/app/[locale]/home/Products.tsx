'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { SecondaryBtnLink } from '../components/Buttons'
import useGetProducts from '../hooks/useGetProducts'

export default function Products() {
	const t = useTranslations('home.products')
	const locale = useLocale()
	const { categories } = useGetProducts(locale)
	const products = categories.slice(0, 7)

	return (
		<section
			className="w-full bg-light-grey text-start py-28 px-6 md:px-12"
			aria-describedby="products"
		>
			<h3 className="font-poppins font-bold text-2xl md:text-3xl" id="products">
				{t('heading')}
			</h3>
			<p className="mt-2 mb-8 text-base text-dark-grey xl:pr-4">
				{t('paragraph')}
			</p>

			<SecondaryBtnLink link={'/products'}>{t('link')}</SecondaryBtnLink>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
				{products &&
					products?.map((p) => (
						<Link
							href={`products/${p._id}`}
							key={p._id}
							title={p?.category}
							className="w-full flex items-center justify-center h-80 xl:h-96 border-3 border-primary rounded-lg relative"
						>
							<Image
								src={`https://api.camberfarms.org/${p?.images?.[0]}`}
								alt={p?.name}
								fill
								sizes="300px"
								// placeholder="blur"
								className="object-cover object-center"
							/>
							<h6 className="capitalize font-bold text-primary text-2xl z-3">
								{p?.name}
							</h6>
						</Link>
					))}
			</div>
		</section>
	)
}
