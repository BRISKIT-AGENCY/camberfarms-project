import frameworkIcon from '@/app/[locale]/assets/icon/framework.svg'
import globeIcon from '@/app/[locale]/assets/icon/globe.svg'
import leafIcon from '@/app/[locale]/assets/icon/leaf.svg'
import starIcon from '@/app/[locale]/assets/icon/star.svg'
import trackIcon from '@/app/[locale]/assets/icon/track.svg'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function AffiliateBenefits() {
	const t = await getTranslations('affiliate.benefits')
	return (
		<>
			<h4 className="text-lg font-medium mb-4 mt-10 self-start">
				{t('heading')}
			</h4>
			<article className="w-full bg-primary text-light-grey text-sm rounded-lg p-4">
				<h6 className="flex items-center gap-1">
					<Image src={starIcon} alt="" width={20} height={20} className="w-4" />
					<span>{t('revenue.heading')}</span>
				</h6>
				<p className="my-1">{t('revenue.text.0')}</p>

				<h6 className="flex items-center gap-1 mt-4">
					<Image
						src={globeIcon}
						alt=""
						width={20}
						height={20}
						className="w-4"
					/>
					<span>{t('commission.heading')}</span>
				</h6>
				<p className="my-1">
					{t('commission.text.0')}
					<br />
					{t('commission.text.1')}
					<br />
					{t('commission.text.2')}
					<br />
					{t('commission.text.3')}
				</p>

				<h6 className="flex items-center gap-1 mt-4">
					<Image
						src={frameworkIcon}
						alt=""
						width={20}
						height={20}
						className="w-4"
					/>
					<span>{t('credibility.heading')}</span>
				</h6>
				<p className="my-1">
					{t('credibility.text.0')}
					<br />
					{t('credibility.text.1')}
					<br />
					{t('credibility.text.2')}
					<br />
					{t('credibility.text.3')}
				</p>

				<h6 className="flex items-center gap-1 mt-4">
					<Image
						src={trackIcon}
						alt=""
						width={20}
						height={20}
						className="w-4"
					/>
					<span>{t('upside.heading')}</span>
				</h6>
				<p className="my-1">
					{t('upside.text.0')}
					<br />
					{t('upside.text.1')}
					<br />
					{t('upside.text.2')}
					<br />
					{t('upside.text.3')}
					<br />
					{t('upside.text.4')}
				</p>
				<h6 className="flex items-center gap-1 mt-4">
					<Image src={leafIcon} alt="" width={20} height={20} className="w-4" />
					<span>{t('alignment.heading')}</span>
				</h6>
				<p className="my-1">
					{t('alignment.text.0')}
					<br />
					{t('alignment.text.1')}
					<br />
					{t('alignment.text.2')}
					<br />
					{t('alignment.text.3')}
				</p>
				<p className="my-1">{t('alignment.text.4')}</p>
			</article>
		</>
	)
}
