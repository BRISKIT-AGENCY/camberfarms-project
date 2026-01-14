import Faq from './components/Faq'
import Blog from './home/Blog'
import Feedback from './home/Feedback'
import Gallery from './home/Gallery'
import Hero from './home/Hero'
import OffersAndLocation from './home/OffersAndLocation'
import Products from './home/Products'
import Testimonials from './home/Testimonials'

export default function Home() {
	return (
		<div className="flex flex-col w-full min-h-screen items-center justify-center bg-light-grey text-foreground font-inter relative">
			<main className="flex min-h-screen w-full flex-col items-center justify-between">
				<Hero />
				<Products />
				<OffersAndLocation />
				<Gallery />
				<Testimonials />
				<Blog />
				<Faq />
				<Feedback />
			</main>
		</div>
	)
}
