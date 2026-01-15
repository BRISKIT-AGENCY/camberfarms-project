import AffiliateBenefits from './AffiliateBenefits'
import AffiliateCommission from './AffiliateCommission'
import AffiliateEligibility from './AffiliateEligibility'
import AffiliateForm from './AffiliateForm'
import AffiliateIntro from './AffiliateIntro'
import Hero from './Hero'

export default function AffiliatePage() {
	return (
		<div className="flex flex-col w-full min-h-screen items-center justify-center bg-light-grey text-foreground font-inter relative">
			<main className="flex min-h-screen w-full flex-col items-center justify-between">
				<Hero />
				<div className="w-full px-10 md:px-20 py-20">
					<AffiliateIntro />
					<AffiliateBenefits />
					<AffiliateEligibility />
				</div>
				<AffiliateCommission />
				<AffiliateForm />
			</main>
		</div>
	)
}
