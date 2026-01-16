import PrivacyCookiesAndData from '../components/PrivacyCookiesAndData'
import PrivacyHeader from '../components/PrivacyHeader'
import PrivacyIntro from '../components/PrivacyIntro'
import PrivacyOthers from '../components/PrivacyOthers'
import PrivacySidebar from '../components/PrivacySidebar'
import Navbar from '../components/Navbar'

export default function PrivacyPage() {
	return (
		<main className="flex flex-col w-full min-h-screen bg-light-grey text-dark-grey font-inter relative">
      <div className="hidden xl:block">
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor="text-white"
        />
      </div>
			<PrivacyHeader />
			<section className="w-full md:py-42 py-25 px-6 md:px-10 lg:px-20 bg-light-grey md:bg-white grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-32 md:gap-20 items-start">
				<article className="w-full text-sm xl:text-base">
					<h2 className="md:text-[46px] text-2xl font-poppins font-medium mb-6">
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