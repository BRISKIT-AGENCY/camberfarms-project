import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import bgPatternImg from '../assets/img/bg-pattern-white.png'
import certification from '../assets/img/certification.png'

export default async function Certifications() {
	const t = await getTranslations('about.certification')
	return (
		<section className="w-full bg-primary text-white text-center px-6 py-10 sm:px-10 lg:px-20 mt-10 relative">
			<Image
				src={bgPatternImg}
				fill
				sizes="100vw"
				placeholder="blur"
				alt=""
				className="object-cover opacity-2 z-1"
			/>
			<div className="w-full h-full z-5 relative">
				<h2 className="text-2xl lg:text-3xl mb-4">{t('heading')}</h2>
				<p className="text-light-grey max-w-xl mx-auto mb-8 text-sm xl:text-base xl:max-w-4xl">
					{t('paragraph')}
				</p>
				<div className="w-fit grid grid-cols-3 gap-4 mx-auto max-w-lg xl:max-w-3xl">
					<Image
						src={certification}
						alt="Certification 1"
						// width={800}
						// height={800}
						sizes="340px"
					/>
					<Image
						src={certification}
						alt="Certification 2"
						// width={800}
						// height={800}
						sizes="340px"
					/>
					<Image
						src={certification}
						alt="Certification 3"
						// width={800}
						// height={800}
						sizes="340px"
					/>
					<Image
						src={certification}
						alt="Certification 4"
						// width={800}
						// height={800}
						sizes="340px"
					/>
					<Image
						src={certification}
						alt="Certification 3"
						// width={800}
						// height={800}
						sizes="340px"
					/>
					<Image
						src={certification}
						alt="Certification 4"
						// width={800}
						// height={800}
						sizes="340px"
					/>
				</div>
			</div>
		</section>
	)
}
