import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function Hero() {
	const t = await getTranslations('contact.hero')
	return (
		<div className="w-full px-10 md:px-20 py-20 lg:pt-36">
			<h1
				className="font-poppins capitalize font-bold text-primary text-2xl sm:text-3xl lg:text-4xl"
				id="contact"
			>
				{t('heading.0')} <br /> {t('heading.1')}
			</h1>
			<p className="text-sm max-w-xl mt-4 lg:text-base lg:max-w-2xl">
				{t('paragraph')}
			</p>
			<Link
				href={'contact#message'}
				className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out"
			>
				{t('button')}
			</Link>
		</div>
	)
}
