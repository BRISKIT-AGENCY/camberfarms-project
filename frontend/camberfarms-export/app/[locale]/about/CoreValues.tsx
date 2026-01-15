import { getTranslations } from 'next-intl/server'

const values = [
	{
		title: 'Integrity',
		text: 'We operate with honesty and accountability.',
	},
	{
		title: 'Quality',
		text: 'Only the finest, certified products leave our hands.',
	},
	{
		title: 'Sustainability',
		text: 'We empower local farmers while preserving our environment.',
	},
	{
		title: 'Partnership',
		text: 'We build long-term, mutually beneficial relationships globally.',
	},
]

export default async function CoreValues() {
	const t = await getTranslations('about.coreValues')
	return (
		<section className="w-full px-6 sm:px-10 lg:px-20 mb-20 space-y-6">
			<div className="w-full flex items-start justify-between gap-4 xl:justify-start">
				<div className="w-56 flex items-center gap-2 text-primary font-poppins font-bold xl:w-60">
					<span className="w-1.5 h-10 bg-secondary"></span>
					<h3 className="text-nowrap xl:text-xl">{t('heading')}</h3>
				</div>

				<ul className="list-disc pl-6 -indent-0.5 w-full space-y-4 xl:text-lg">
					{values.map((value, index) => (
						<li key={index} className="leading-[1.7]">
							<strong className=" decoration-0 not-italic font-normal">
								{t(`values.${index}.title`)}:
							</strong>{' '}
							{t(`values.${index}.text`)}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
