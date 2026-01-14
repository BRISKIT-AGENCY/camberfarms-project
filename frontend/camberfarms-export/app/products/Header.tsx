import Image from 'next/image'
import tomatoesImg from '../assets/img/tomato-shrubs.png'

export default function Header() {
	return (
		<section className="w-full h-[60vh] flex flex-col items-center justify-center px-6 py-10 bg-black/70 text-white relative">
			<Image
				src={tomatoesImg}
				fill
				sizes="100vw"
				placeholder="blur"
				alt="camberfarms nuts"
				className="object-cover object-center lg:object-fill lg:bg-size-[auto_200%] bg-blend-screen"
			/>
			<div
				className="w-full h-full absolute inset-0 z-1 bg-black/40"
				aria-hidden
			/>
			<div className="w-full sm:w-4/5 md:max-w-3xl flex flex-col items-center justify-center mx-auto mt-10 gap-2 relative z-3">
				<h1 className="font-poppins font-bold text-center text-3xl md:text-4xl lg:text-[46px] leading-9 md:leading-12">
					Our Products
				</h1>
				<p className="font-inter text-base text-center mt-2 text-light-grey">
					Some of our products from our farms are;
					<br />
					Grains, Fruits, Sesame seeds, Spices and Vegetables.
				</p>
			</div>
		</section>
	)
}

// TODO fix stretched background image (on desktop)
