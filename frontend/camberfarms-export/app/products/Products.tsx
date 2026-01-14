import ProductItem from './ProductItem'

import pepperImg from '../assets/img/black-pepper.webp'
import cashewImg from '../assets/img/cashew.webp'
import grainsImg from '../assets/img/grain-seed.png'
// import soyabeansImg from '../assets/img/soyabeans.png'
import tumericImg from '../assets/img/tumeric-root.webp'
// import wheatImg from '../assets/img/wheat.png's

export default function Products() {
	return (
		<section className="w-full pt-8 bg-white" aria-describedby="products">
			<h4
				className="font-poppins font-semibold text-xl md:text-2xl text-center text-primary"
				id="products"
			>
				The products we produce, process and export are;
			</h4>

			<div className="w-full flex flex-col gap-28 mt-8 bg-light-green py-20 px-6 md:px-12">
				<ProductItem
					name="wheat"
					img={grainsImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/>
				<ProductItem
					name="black pepper"
					img={pepperImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/>
				<ProductItem
					name="raw cashew nuts"
					img={cashewImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/>
				<ProductItem
					name="tumeric"
					img={tumericImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/>
			</div>
		</section>
	)
}
