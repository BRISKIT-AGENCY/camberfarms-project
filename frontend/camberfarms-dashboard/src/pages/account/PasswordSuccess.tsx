import { Link } from 'react-router-dom'
import successImg from '../../assets/img/success-tag-transparent.png'
import OverlayWrapper from '../../components/OverlayWrapper'

export default function PasswordSuccess() {
	return (
		<OverlayWrapper fullWidth={false}>
			<div className="w-md pb-4 px-2 flex flex-col gap-2 bg-white text-black dark:bg-black dark:text-white relative">
				<img
					src={successImg}
					className="w-40 aspect-square object-contain inline-flex mx-auto"
					alt=""
				/>
				<h6 className="text-2xl text-center font-bold font-poppins mb-8 mt-3">
					Password changed
					<br /> successfully
				</h6>

				<Link
					to={'/account'}
					className="w-full text-center bg-primary text-white py-2 px-6 font-medium font-poppins text-lg cursor-pointer rounded-lg hover:opacity-80 transition-all duration-200"
				>
					Back to profile
				</Link>
			</div>
		</OverlayWrapper>
	)
}
