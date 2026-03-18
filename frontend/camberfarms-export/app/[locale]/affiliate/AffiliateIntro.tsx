import farmerImg from '@/app/[locale]/assets/img/farm-man.webp'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function AffiliateIntro() {
	const t = await getTranslations('affiliate.intro')
	return (
		<>
			<p>{t('paragraph1')}</p>
			<h4 className="w-full p-4 bg-primary text-light-grey mt-8 mb-2">
				{t('subheading')}
			</h4>
			<p>{t('paragraph2')}</p>
			<p>{t('paragraph3')}</p>
			<div className="w-full h-75 lg:h-125 my-8 relative">
				<Image
					src={farmerImg}
					alt="a farmer"
					placeholder="blur"
					fill
					className="object-cover object-center"
				/>
			</div>
		</>
	)
}
