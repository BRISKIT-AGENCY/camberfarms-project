import frameworkIcon from '@/app/[locale]/assets/icon/framework.svg'
import globeIcon from '@/app/[locale]/assets/icon/globe.svg'
import leafIcon from '@/app/[locale]/assets/icon/leaf.svg'
import starIcon from '@/app/[locale]/assets/icon/star.svg'
import trackIcon from '@/app/[locale]/assets/icon/track.svg'
import Image from 'next/image'

export default function AffiliateBenefits() {
	return (
		<>
			<h4 className="text-lg font-medium mb-4 mt-10 self-start">
				Benefits Of Joining Our Affiliate Program
			</h4>
			<article className="w-full bg-primary text-light-grey text-sm rounded-lg p-4">
				<h6 className="flex items-center gap-1">
					<Image src={starIcon} alt="" width={20} height={20} className="w-4" />
					<span>Competitive Commision Rate:</span>
				</h6>
				<p className="my-1">
					As an Affiliate partner, you will be at the forefront of this mission,
					helping to connect our prodcuts with the clients across the globe
					while enjoying lucrative rewards for your efforts.{' '}
				</p>

				<h6 className="flex items-center gap-1 mt-4">
					<Image
						src={globeIcon}
						alt=""
						width={20}
						height={20}
						className="w-4"
					/>
					<span>Global Reach:</span>
				</h6>
				<p className="my-1">
					As an Affiliate partner, you will be at the forefront of this mission,
					helping to connect our prodcuts with the clients across the globe
					while enjoying lucrative rewards for your efforts.{' '}
				</p>

				<h6 className="flex items-center gap-1 mt-4">
					<Image
						src={frameworkIcon}
						alt=""
						width={20}
						height={20}
						className="w-4"
					/>
					<span>Exclusive Broker Resources:</span>
				</h6>
				<p className="my-1">
					As an Affiliate partner, you will be at the forefront of this mission,
					helping to connect our prodcuts with the clients across the globe
					while enjoying lucrative rewards for your efforts.{' '}
				</p>

				<h6 className="flex items-center gap-1 mt-4">
					<Image
						src={trackIcon}
						alt=""
						width={20}
						height={20}
						className="w-4"
					/>
					<span>Transparent Tracking and Reporting:</span>
				</h6>
				<p className="my-1">
					As an Affiliate partner, you will be at the forefront of this mission,
					helping to connect our prodcuts with the clients across the globe
					while enjoying lucrative rewards for your efforts.{' '}
				</p>
				<h6 className="flex items-center gap-1 mt-4">
					<Image src={leafIcon} alt="" width={20} height={20} className="w-4" />
					<span>Sustainable and Ethical Products:</span>
				</h6>
				<p className="my-1">
					As an Affiliate partner, you will be at the forefront of this mission,
					helping to connect our prodcuts with the clients across the globe
					while enjoying lucrative rewards for your efforts.{' '}
				</p>
			</article>
		</>
	)
}
