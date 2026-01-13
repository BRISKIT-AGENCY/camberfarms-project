import Link from 'next/link'

export default function PrivacySidebar() {
	return (
		<aside className="w-full min-w-50 bg-light-green rounded-2xl px-10 md:px-6 lg:px-10 py-14 space-y-6 text-dark-grey">
			<h2 className="text-3xl md:text-2xl xl:text-4xl uppercase text-secondary font-poppins font-bold mb-10">
				on this page
			</h2>
			<nav className="flex flex-col gap-4 capitalize text-sm xl:text-base">
				<Link
					href={'privacy#introduction'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					introduction
				</Link>
				<Link
					href={'privacy#information-we-collect'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					information we collect
				</Link>
				<Link
					href={'privacy#how-we-use-your-information'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					how we use your information
				</Link>
				<Link
					href={'privacy#legal-basis-for-processing'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					legal basis for processing
				</Link>
				<Link
					href={'privacy#cookies-and-tracking-technologies'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					cookies and tracking technologies
				</Link>
				<Link
					href={'privacy#data-retention'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					data retention
				</Link>
				<Link
					href={'privacy#data-sharing-and-disclosure'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					data sharing and disclosure
				</Link>
				<Link
					href={'privacy#data-security'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					data security
				</Link>
				<Link
					href={'privacy#your-rights'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					your rights
				</Link>
				<Link
					href={'privacy#third-party-links'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					third-party links
				</Link>
				<Link
					href={'privacy#international-data-transfer'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					international data transfer
				</Link>
				<Link
					href={'privacy#children-s-privacy'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					children&apos;s privacy
				</Link>
				<Link
					href={'privacy#update-to-this-policy'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					update to this policy
				</Link>
				<Link
					href={'privacy#contact-us'}
					className="hover:text-primary hover:underline transition-colors ease-in duration-250"
				>
					contact us
				</Link>
			</nav>
			<div className="flex flex-col gap-4 mt-20 text-primary md:text-sm lg:text-base">
				<h6 className="font-poppins font-bold text-lg md:text-sm lg:text-lg">
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
