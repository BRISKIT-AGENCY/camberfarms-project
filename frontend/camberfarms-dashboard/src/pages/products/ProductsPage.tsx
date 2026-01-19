import grainImg from '../../assets/img/grains-product.png'
import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'
import ProductsHeader from './ProductsHeader'

import { Outlet, useNavigate } from 'react-router-dom'

export default function ProductsPage() {
	const navigate = useNavigate()

	function handleClick() {
		console.log('btn clicked')
		navigate('new')
	}
	function editPage() {
		navigate('edit')
	}
	return (
		<section className="w-full p-6">
			<ProductsHeader />
			<div className="w-full grid grid-cols-2 gap-6 items-stretch">
				<CardItem
					title="premium wheat seeds"
					primaryBtnText="edit"
					primaryBtnClick={handleClick}
					secondaryBtnText="delete"
					secondaryBtnClick={editPage}
					flag="spices"
					flagColor="#16A34A"
					image={productImg}
				>
					<p>hello world</p>
				</CardItem>
				<CardItem
					title="premium wheat seeds"
					primaryBtnText="edit"
					primaryBtnClick={handleClick}
					secondaryBtnText="delete"
					secondaryBtnClick={editPage}
					flag="grain"
					flagColor="#FFFFFF"
					image={grainImg}
				>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
						cum odit velit hic magni officiis molestiae? Magnam aliquam
						explicabo vel.
					</p>
				</CardItem>
			</div>
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
