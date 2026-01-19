import { IoClose } from 'react-icons/io5'
import OverlayWrapper from '../../components/OverlayWrapper'

export default function AddProduct() {
	const goBack = () => history.back()

	return (
		<OverlayWrapper>
			<div className="w-full">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1 id="page-title" className="text-2xl lg:text-3xl capitalize">
						add new product
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<div className="">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, error
						est nostrum sed dignissimos ut amet numquam culpa minus, facilis
						delectus tempora, veritatis voluptate illo similique necessitatibus.
						Cumque, eum et.
					</p>
					<p>
						Rem, sunt, eligendi quibusdam officiis sed incidunt exercitationem
						voluptate quas saepe tempora ex adipisci voluptas rerum eveniet
						provident nisi quo cum! Architecto vitae cupiditate earum voluptas
						provident repellat cum impedit?
					</p>
					<p>
						Cupiditate deleniti officia possimus, exercitationem illo delectus,
						placeat nesciunt nisi maiores hic saepe, iusto inventore dignissimos
						doloremque fugiat quidem recusandae? Aliquam nesciunt architecto
						earum excepturi sed, nihil quia minus consectetur?
					</p>
				</div>
			</div>
		</OverlayWrapper>
	)
}
