import AboutHero from './AboutHero'
import Certifications from './Certifications'
import CoreValues from './CoreValues'
import GlobalReach from './GlobalReach'
import MissionVision from './MissionVission'

export default async function AboutPage({ params }: PageProps<'/[locale]'>) {
	const { locale } = await params
	return (
		<main className="flex flex-col w-full items-center justify-center bg-light-grey text-foreground font-inter relative">
			<AboutHero />
			<MissionVision />
			<CoreValues />
			<GlobalReach />
			<Certifications />
		</main>
	)
}
