import { getTranslations } from 'next-intl/server'

export default async function PrivacyCookiesAndData() {
	const t = await getTranslations('privacy.cookiesAndData')

	return (
		<>
			<h6
				id="cookies-and-tracking-technologies"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('cookiesAndTracking.title')}
			</h6>
			{t
				.raw('cookiesAndTracking.paragraphs')
				.map((text: string, index: number) => (
					<p key={index} className="">
						{text}
					</p>
				))}
			<h6
				id="data-retention"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('dataRetention.title')}
			</h6>
			{t.raw('dataRetention.paragraphs').map((text: string, index: number) => (
				<p key={index} className="">
					{text}
				</p>
			))}

			<h6
				id="data-sharing-and-disclosure"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('dataSharingAndDisclosure.title')}
			</h6>
			<p className="my-2">{t('dataSharingAndDisclosure.intro')}</p>
			<ul role="list" className="list-disc pl-6 -indent-0.5">
				{t
					.raw('dataSharingAndDisclosure.list')
					.map((text: string, index: number) => (
						<li key={index} className="">
							{text}
						</li>
					))}
			</ul>
			<p className="my-4">{t('dataSharingAndDisclosure.outro')}</p>
			<h6
				id="data-security"
				className="text-xl text-black font-poppins font-medium mb-4"
			>
				{t('dataSecurity.title')}
			</h6>
			{t.raw('dataSecurity.paragraphs').map((text: string, index: number) => (
				<p key={index} className="">
					{text}
				</p>
			))}

			<h6
				id="your-rights"
				className="text-lg text-black font-poppins font-medium mt-4"
			>
				{t('yourRights.title')}
			</h6>
			<p className="my-2">{t('yourRights.intro')}</p>
			<ul role="list" className="list-disc pl-6 -indent-0.5">
				{t.raw('yourRights.list').map((text: string, index: number) => (
					<li key={index} className="">
						{text}
					</li>
				))}
			</ul>
			<p className="my-4">
				{t('yourRights.contact')}{' '}
				<a href="mailto:info@camberfarmgroup.com" className="underline">
					{t.rich('yourRights.email')}
				</a>
				.
			</p>
		</>
	)
}
