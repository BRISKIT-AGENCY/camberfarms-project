import Link from 'next/link'

export default function PrivacySidebar() {
	return (
		<aside className="w-full bg-light-green rounded-2xl px-10 py-14 space-y-6 text-dark-grey">
			<h2 className="text-3xl xl:text-4xl uppercase text-secondary font-poppins font-bold mb-10">
				on this page
			</h2>
			<nav className="flex flex-col gap-4 capitalize text-sm xl:text-base">
				<Link href={'privacy#introduction'}>introduction</Link>
				<Link href={'privacy#information-we-collect'}>
					information we collect
				</Link>
				<Link href={'privacy#how-we-use-your-information'}>
					how we use your information
				</Link>
				<Link href={'privacy#legal-basis-for-processing'}>
					legal basis for processing
				</Link>
				<Link href={'privacy#cookies-and-tracking-technologies'}>
					cookies and tracking technologies
				</Link>
				<Link href={'privacy#data-retention'}>data retention</Link>
				<Link href={'privacy#data-sharing-and-disclosure'}>
					data sharing and disclosure
				</Link>
				<Link href={'privacy#data-security'}>data security</Link>
				<Link href={'privacy#your-rights'}>your rights</Link>
				<Link href={'privacy#third-party-links'}>third-party links</Link>
				<Link href={'privacy#international-data-transfer'}>
					international data transfer
				</Link>
				<Link href={'privacy#children-s-privacy'}>children&apos;s privacy</Link>
				<Link href={'privacy#update-to-this-policy'}>
					update to this policy
				</Link>
				<Link href={'privacy#contact-us'}>contact us</Link>
			</nav>
			<div className="flex flex-col gap-4 mt-20 text-primary">
				<h6 className="font-poppins font-bold text-lg">
					Need to get in touch?
				</h6>
				<p>
					We&apos;ll start with some questions and
					<br /> get you to the right place.
				</p>
				<Link
					href={'contact'}
					className="w-fit flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium hover:bg-primary/70 transition-colors ease-in-out"
				>
					contact us
				</Link>
			</div>
		</aside>
	)
}
