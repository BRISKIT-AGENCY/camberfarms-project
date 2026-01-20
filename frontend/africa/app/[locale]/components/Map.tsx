import { getTranslations } from "next-intl/server"
export default async function Map() {
	const t = await getTranslations("Map")
	return (
		<div className="w-full h-fit py-14 md:py-20 px-10 md:px-20 relative">
			<h4 className="font-poppins font-bold text-primary text-xl sm:text-2xl mb-8">
				{t("title")}
			</h4>
			<div className="relative w-full h-105 md:h-130 shadow">
				<div className="overflow-hidden bg-none w-full h-full absolute inset-0 rounded-2xl">
					<iframe
						className="w-full h-full inset-0"
						src="https://maps.google.com/maps?width=850&height=600&hl=en&q=123%20Trade%20Zone%2C%20Lagos%2C%20Nigeria&t=p&z=16&ie=UTF8&iwloc=B&output=embed"
					></iframe>
				</div>
			</div>
		</div>
	)
}