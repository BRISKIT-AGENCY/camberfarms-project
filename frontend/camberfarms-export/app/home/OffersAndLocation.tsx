import Image from 'next/image'
import patternBg from '../assets/img/bg-pattern-white.png'

export default function OffersAndLocation() {
	return (
		<section
			className="w-full h-fit py-10 md:py-14 relative"
			aria-labelledby="special-offers"
		>
			<Image
				src={patternBg}
				alt=""
				fill
				className="object-cover opacity-3"
				aria-hidden
			/>
			<div className="w-full relative z-3">
				<h3
					className="font-poppins font-bold text-center text-xl md:text-2xl"
					id="special-offers"
				>
					Special Offers
				</h3>
				<p className="mt-2 mb-12 mx-4 sm:max-w-2xl sm:mx-auto text-base text-balance text-center md:text-wrap text-dark-grey">
					We have access to many other products and the accessibility is
					seamless for us Regardless of the products you are looking for, we
					have covered you.
				</p>

				<article className="w-full bg-primary text-white px-10 py-14 lg:py-16 flex flex-col items-center sm:flex-row sm:justify-between gap-4 gap-y-8 font-poppins">
					<div className="flex flex-1 flex-col items-center gap-2">
						<h6 className="text-sm font-medium leading-relaxed">
							Tons of Harvest
						</h6>
						<p className="text-4xl font-bold">{`7,000`}</p>
					</div>
					<div className="flex flex-1 flex-col items-center gap-2">
						<h6 className="text-sm font-medium leading-relaxed">
							Packaged Bags
						</h6>
						<p className="text-4xl font-bold">{`500,000`}</p>
					</div>
					<div className="flex flex-1 flex-col items-center gap-2">
						<h6 className="text-sm font-medium leading-relaxed">
							Units of Farm Equipments
						</h6>
						<p className="text-4xl font-bold">{`890`}</p>
					</div>
				</article>
				<div className="w-11/12 my-16 mx-4 sm:max-w-2xl lg:max-w-4xl sm:mx-auto">
					<h4 className="font-poppins font-bold text-center text-xl md:text-2xl">
						We Have Multiple Locations <br aria-hidden /> Around The World
					</h4>
					<p className="mt-2 text-base lg:text-lg text-center text-balance text-dark-grey">
						We are strategically located in Nigeria with partnering agents
						across the federation with all requisite facilities including state
						of the art machines and equipment.
					</p>
				</div>
			</div>
		</section>
	)
}
