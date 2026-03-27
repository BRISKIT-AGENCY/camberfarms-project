import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function PrivacySidebar() {
	const t = await getTranslations('privacy.nav')
	return (
		<aside className="w-full min-w-50 bg-light-green rounded-2xl px-10 md:px-6 lg:px-10 py-14 space-y-6 text-dark-grey">
			<h2 className="text-3xl md:text-2xl xl:text-4xl uppercase text-secondary font-poppins font-bold mb-10">
				{t.rich('sidebar.title')}
			</h2>
			<nav className="flex flex-col gap-4 capitalize text-sm xl:text-base">
				<Link
					href={'privacy#introduction'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.introduction')}
				</Link>
				<Link
					href={'privacy#information-we-collect'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.informationWeCollect')}
				</Link>
				<Link
					href={'privacy#how-we-use-your-information'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.howWeUseInformation')}
				</Link>
				<Link
					href={'privacy#legal-basis-for-processing'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.legalBasis')}
				</Link>
				<Link
					href={'privacy#cookies-and-tracking-technologies'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.cookiesAndTracking')}
				</Link>
				<Link
					href={'privacy#data-retention'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.dataRetention')}
				</Link>
				<Link
					href={'privacy#data-sharing-and-disclosure'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.dataSharing')}
				</Link>
				<Link
					href={'privacy#data-security'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.dataSecurity')}
				</Link>
				<Link
					href={'privacy#your-rights'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.yourRights')}
				</Link>
				<Link
					href={'privacy#third-party-links'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.thirdPartyLinks')}
				</Link>
				<Link
					href={'privacy#international-data-transfer'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.internationalDataTransfer')}
				</Link>
				<Link
					href={'privacy#children-s-privacy'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.childrenPrivacy')}
				</Link>
				<Link
					href={'privacy#update-to-this-policy'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.updates')}
				</Link>
				<Link
					href={'privacy#contact-us'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					{t.rich('sidebar.links.contact')}
				</Link>
			</nav>
			<div className="flex flex-col gap-4 mt-20 text-primary md:text-sm lg:text-base">
				<h6 className="font-poppins font-bold text-lg md:text-sm lg:text-lg">
					{t('sidebar.cta.title')}
				</h6>
				<p>{t.rich('sidebar.cta.description')}</p>
				<Link
					href={'contact'}
					className="w-fit flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium hover:bg-primary/70 transition-colors ease-in-out"
				>
					{t.rich('sidebar.cta.button')}
				</Link>
			</div>
		</aside>
	)
}
