import { getTranslations } from 'next-intl/server'

export default async function AffiliateEligibility() {
	const t = await getTranslations('affiliate.join')
	return (
		<>
			<h4 className="text-lg font-medium mb-3 mt-8 self-start">
				{t('heading')}
			</h4>
			<article className="w-full bg-secondary text-light-grey text-sm rounded-lg p-4">
				<p className="my-1">{t('p0')}</p>
				<h6 className="flex items-center gap-2 before:w-1 before:aspect-square before:rounded-full before:bg-white">
					{t('p1')}
				</h6>

				<p className="my-1">{t('p2')}</p>
				<h6 className="flex items-center gap-2 mt-4 before:w-1 before:aspect-square before:rounded-full before:bg-white">
					{t('p3')}
				</h6>

				<p className="my-1">{t('p4')}</p>
				<h6 className="flex items-center gap-2 mt-4 before:w-1 before:aspect-square before:rounded-full before:bg-white">
					{t('p5')}
				</h6>

				<p className="my-1">{t('p6')}</p>
				<h6 className="flex items-center gap-2 mt-4">{t('p7')}</h6>
				<p className="flex items-center gap-2 mt-4 before:w-1 before:aspect-square before:rounded-full before:bg-white">
					{t('p8')}
				</p>
				<p className="my-1">{t('p9')}</p>
				<p className="flex items-center gap-2 mt-4 before:w-1 before:aspect-square before:rounded-full before:bg-white">
					{t('p10')}
				</p>
				<p className="my-1">{t('p11')}</p>
			</article>
		</>
	)
}
