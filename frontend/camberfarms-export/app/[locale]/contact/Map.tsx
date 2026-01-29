import { getTranslations } from 'next-intl/server'

export default async function Map() {
	const t = await getTranslations('contact.map')
	return (
		<div className="w-full h-fit py-14 md:py-20 px-10 md:px-20 relative">
			<h4 className="font-poppins font-bold text-primary text-xl sm:text-2xl mb-8">
				{t('heading')}
			</h4>
			<div className="relative w-full h-105 md:h-130 shadow">
				<div className="overflow-hidden bg-none w-full h-full absolute inset-0 rounded-2xl">
					<iframe
						width="100%"
						height="520"
						frameBorder="0"
						scrolling="no"
						marginHeight={0}
						marginWidth={0}
						src="https://maps.google.com/maps?width=100%25&amp;height=520&amp;hl=en&amp;q=Graceland%20Plaza,%20by%20Mobil%20Junction%20along%20Nkpolu-Rumuigbo%20east%20west%20road,%20Port%20Harcourt%20Rivers%20State%20Nigeria+(CamberFarms%20Export)&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
					>
						<a href="https://www.mapsdirections.info/de/evolkerung-auf-einer-karte-berechnen/">
							Bevölkerungskarte Deutschland
						</a>
					</iframe>
				</div>
			</div>
		</div>
	)
}
