import farmerImg from '@/app/[locale]/assets/img/farm-man.webp'
import Image from 'next/image'

export default function AffiliateIntro() {
	return (
		<>
			<p>
				Are you passionate about Agricultural exports, expanding global markets
				and connecting high quality products with businesses worldwide? Welcome
				to Camberfarms Affiliate Program, where we offer you a unique
				opportunity to expand your portfolio and to earn independently as we
				make sales together. With the right parthnership, benefits will be
				gained both ways.
			</p>
			<h4 className="w-full p-4 bg-primary text-light-grey mt-8 mb-2">
				Why Partner With Camberfarms?
			</h4>
			<p>
				At Camberfarms, we specialize in sourcing, processing, and exporting
				premium African agricultural products like Hibiscus flower, Blackstone
				stone flower, Raw cashew nuts. and other high demands crop. Our mission
				is to deliver exceptional quality, promote sustainable farming and
				empower local communities.
			</p>
			<p>
				As an Affiliate partner, you will be at the forefront of this mission,
				helping to connect our prodcuts with the clients across the globe while
				enjoying lucrative rewards for your efforts.{' '}
			</p>
			<div className="w-full h-75 lg:h-125 my-8 relative">
				<Image
					src={farmerImg}
					alt="a farmer"
					fill
					className="object-cover object-center"
				/>
			</div>
		</>
	)
}
