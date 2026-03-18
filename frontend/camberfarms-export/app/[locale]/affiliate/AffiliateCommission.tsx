import { getTranslations } from 'next-intl/server'

export default async function AffiliateCommission() {
	const t = await getTranslations('affiliate.commission')
	return (
		<>
			<div className="w-full bg-grey text-white text-center flex flex-col items-center justify-center gap-2 p-8">
				<h4 className="text-3xl sm:text-4xl font-poppins font-bold">
					{t('heading')}
				</h4>
				<p className="text-sm">
					{t('paragraph1.0')}
					<br /> {t('paragraph1.1')}
				</p>
			</div>
			<div className="w-full px-10 md:px-20 my-10 text-sm text-dark-grey">
				<h4 className="text-xl text-black mb-2">{t('subheading')}</h4>
				<p>{t('paragraph2')}</p>
			</div>
		</>
	)
}
