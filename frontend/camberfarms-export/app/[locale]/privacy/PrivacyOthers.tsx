import { getTranslations } from 'next-intl/server'

export default async function PrivacyOthers() {
	const t = await getTranslations('privacy.others')
	return (
		<>
			<h6
				id="third-party-links"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('thirdPartyLinks.title')}
			</h6>
			<p className="">{t('thirdPartyLinks.paragraph')}</p>

			<h6
				id="international-data-transfers"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('internationalDataTransfers.title')}
			</h6>
			<p className="">{t('internationalDataTransfers.paragraph')}</p>
			<h6
				id="children-s-privacy"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('childrenPrivacy.title')}
			</h6>
			<p className="">{t('childrenPrivacy.paragraph')}</p>
			<h6
				id="updates-to-this-policy"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('updates.title')}
			</h6>
			<p className="">{t('updates.paragraph')}</p>
			<h6
				id="contact-us"
				className="text-xl text-black font-poppins font-medium mb-4 mt-6"
			>
				{t('contact.title')}
			</h6>
			<p className="">{t('contact.intro')}</p>
			<div className="flex flex-col">
				<a href="mailto:info@camberfarmgroup.com" className="underline">
					{t.rich('contact.email')}
				</a>
				<span>{t('contact.location')}</span>
				<span>{t.rich('contact.hours')}</span>
			</div>
		</>
	)
}
