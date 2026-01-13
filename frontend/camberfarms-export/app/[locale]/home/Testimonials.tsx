import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import user1 from '../assets/img/user-1.png'
import user2 from '../assets/img/user-2.png'
import user3 from '../assets/img/user-3.png'

export default async function Testimonials() {
	const t = await getTranslations('home.testimonials')
	return (
		<section className="w-full py-10 md:py-14" aria-labelledby="testimonials">
			<h3
				className="font-poppins capitalize font-bold text-center text-xl md:text-2xl mb-8"
				id="testimonials"
			>
				{t('heading')}
			</h3>
			<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center justify-between p-6">
				{TESTIMONIALS.map((item, index) => (
					<div
						key={index}
						className="w-full flex flex-col items-center justify-center gap-3 text-center "
					>
						<h6 className="text-2xl font-poppins capitalize">
							- {t(`users.${index}.name`)}
						</h6>
						<p className="font-inter text-balance text-sm mb-3">
							{t(`users.${index}.content`)}
						</p>
						<Image
							src={item.img}
							alt={t(`users.${index}.name`)}
							width={200}
							height={200}
							placeholder="blur"
							className="w-1/4 aspect-square object-fill object-center rounded-full"
						/>
					</div>
				))}
			</article>
		</section>
	)
}

const TESTIMONIALS = [
	{
		id: 1,
		name: 'Lydia Yisa',
		img: user1,
		content:
			'“We appreciate their consistency in quality and after service. Their corporation with rural African farmers is also commendable.” Moreover, we deeply admire their proactive efforts towards customer satisfaction.',
	},
	{
		id: 2,
		name: 'Adebayo L',
		img: user2,
		content:
			'“We appreciate their consistency in quality and after service. Their corporation with rural African farmers is also commendable.” Moreover, we deeply admire their proactive efforts towards customer satisfaction.',
	},
	{
		id: 3,
		name: 'Chuks David',
		img: user3,
		content:
			'“We appreciate their consistency in quality and after service. Their corporation with rural African farmers is also commendable.” Moreover, we deeply admire their proactive efforts towards customer satisfaction.',
	},
]
