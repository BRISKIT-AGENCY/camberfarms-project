import PrivacyCookiesAndData from './PrivacyCookiesAndData'
import PrivacyHeader from './PrivacyHeader'
import PrivacyIntro from './PrivacyIntro'
import PrivacyOthers from './PrivacyOthers'
import PrivacySidebar from './PrivacySidebar'

export default function PrivacyPage() {
	return (
		<main className="flex flex-col w-full min-h-screen bg-light-grey text-dark-grey font-inter relative">
			<PrivacyHeader />
			<section className="w-full py-20 px-6 md:px-10 lg:px-20 bg-light-grey md:bg-white flex flex-col-reverse md:grid md:grid-cols-[2fr_1fr] gap-32 md:gap-10 lg:gap-20 items-start">
				<article className="w-full text-sm xl:text-base">
					<h2 className="text-2xl font-poppins font-medium mb-6">
						Privacy Policy
					</h2>
					<PrivacyIntro />
					<PrivacyCookiesAndData />
					<PrivacyOthers />
				</article>
				<PrivacySidebar />
			</section>
		</main>
	)
}
