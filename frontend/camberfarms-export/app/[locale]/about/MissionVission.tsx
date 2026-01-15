import { getTranslations } from 'next-intl/server'

export default async function MissionVision() {
	const t = await getTranslations('about.missionVission')
	return (
		<section className="w-full px-6 sm:px-10 lg:px-20 my-10 space-y-6 xl:space-y-10">
			{/* Mission */}
			<div className="w-full flex items-start justify-between gap-4 lg:justify-start xl:items-center">
				<div className="w-56 flex items-center gap-2 text-primary font-poppins font-bold xl:w-48">
					<span className="w-1.5 h-10 bg-secondary" aria-hidden></span>
					<h3>{t('mission.heading')}</h3>
				</div>
				<p>{t('mission.paragraph')}</p>
			</div>

			{/* Vision */}
			<div className="w-full flex items-start justify-between gap-4 lg:justify-start xl:items-center">
				<div className="w-56 flex items-center gap-2 text-primary font-poppins font-bold xl:w-48">
					<span className="w-1.5 h-10 bg-secondary" aria-hidden></span>
					<h3>{t('vision.heading')}</h3>
				</div>
				<p>{t('vision.paragraph')}</p>
			</div>
		</section>
	)
}
