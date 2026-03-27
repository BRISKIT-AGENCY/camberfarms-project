import { getTranslations } from 'next-intl/server'

export default async function PrivacyIntro() {
	const t = await getTranslations('privacy.intro')
	return (
		<>
			<h6
				id="introduction"
				className="text-xl text-black font-poppins font-medium mb-4"
			>
				{t('intro.title')}
			</h6>
			<p className="text-dark-grey">{t('intro.paragraph')}</p>
			<h6
				id="information-we-collect"
				className="text-lg text-black font-poppins font-medium my-4"
			>
				{t('informationWeCollect.title')}
			</h6>
			<p>{t('informationWeCollect.description')}</p>
			<p className="my-4 text-dark-grey">{t('informationWeCollect.intro')}</p>

			<p>{t('informationWeCollect.personal.title')}</p>
			<ul role="list" className="list-disc pl-6 -indent-0.5">
				{t
					.raw('informationWeCollect.personal.list')
					.map((item: string, index: number) => (
						<li key={index}>{item}</li>
					))}
			</ul>
			<p>{t('informationWeCollect.nonPersonal.title')}</p>
			<ul role="list" className="list-disc pl-6 -indent-0.5">
				{t
					.raw('informationWeCollect.nonPersonal.list')
					.map((item: string, index: number) => (
						<li key={index}>{item}</li>
					))}
			</ul>
			<h6
				id="how-we-use-your-information"
				className="text-lg text-black font-poppins font-medium mt-4"
			>
				{t('howWeUseInformation.title')}
			</h6>
			<p className="my-2">{t('howWeUseInformation.intro')}</p>
			<ul role="list" className="list-disc pl-6 -indent-0.5">
				{t
					.raw('howWeUseInformation.list')
					.map((item: string, index: number) => (
						<li key={index}>{item}</li>
					))}
			</ul>
			<p className="my-4">{t('howWeUseInformation.outro')}</p>
			<h6
				id="legal-basis-for-processing"
				className="text-lg text-black font-poppins font-medium mt-4"
			>
				{t('legalBasis.title')}
			</h6>
			<p className="mt-2 mb-4">{t('legalBasis.intro')}</p>
			<ul role="list" className="list-disc pl-6 -indent-0.5">
				{t.raw('legalBasis.list').map((item: string, index: number) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</>
	)
}
