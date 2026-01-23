import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation, useParams } from 'react-router-dom'
// import productImg from '../../assets/img/wheat-product.png'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { Farmer } from './AffilateTable'

export default function AffiliateMembership() {
	const goBack = useGoBack('/affiliate')
	const location = useLocation()
	const farmer: Farmer | null = location.state?.farmer
	const params = useParams()

	useEffect(() => {
		if (!params?.id) {
			setTimeout(goBack, 1000)
		}
	}, [params, goBack])

	return (
		<OverlayWrapper>
			<section className="w-full">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						affiliate form
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<div className="w-full min-h-40 bg-grey/10 p-6 rounded-lg mb-6">
					<h6 className="text-black font-semibold mb-6">User Information</h6>
					<div className="grid grid-cols-2 items-start gap-4 w-full h-full">
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Name</span>
							<input
								type="text"
								value={farmer?.name}
								readOnly
								className="text-black text-base capitalize select-all outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Phone number</span>
							<input
								type="text"
								value={farmer?.phone}
								readOnly
								className="text-black text-base w-fit select-all outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey select-all">
								Email Address
							</span>
							<input
								type="text"
								value={farmer?.email}
								readOnly
								className="text-black text-base w-fit select-all outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Country</span>
							<input
								type="text"
								value={farmer?.country}
								readOnly
								className="text-black text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Gender</span>
							<input
								type="text"
								value={farmer?.gender}
								readOnly
								className="text-black text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">State</span>
							<input
								type="text"
								value={farmer?.state}
								readOnly
								className="text-black text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Date of Birth</span>
							<input
								type="text"
								value={farmer?.dob}
								readOnly
								className="text-black text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Region</span>
							<input
								type="text"
								value={farmer?.region}
								readOnly
								className="text-black text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
					</div>
				</div>
				<div className="w-full min-h-40 bg-grey/10 p-6 rounded-lg mb-6">
					<h6 className="text-black font-semibold mb-4">
						Buyer's Information (*If Available)
					</h6>
					<div className="grid grid-cols-2 items-start gap-2 w-full h-full">
						{/* buyer's name */}
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Name</span>
							<input
								type="text"
								value={farmer?.name}
								readOnly
								className="text-black text-base capitalize select-all outline-0 border-0"
							/>
						</label>
						{/* product */}
						<label className="flex flex-col gap-2">
							<span className="text-sm text-grey">Product</span>
							<input
								type="text"
								value={farmer?.buyerProduct}
								readOnly
								className="text-black text-base w-fit capitalize select-all outline-0 border-0"
							/>
						</label>
						{/* country */}
						<label className="flex flex-col gap-2">
							<span className="text-sm text-grey">Country</span>
							<input
								type="text"
								value={farmer?.buyerCountry}
								readOnly
								className="text-black text-base w-fit capitalize select-all outline-0 border-0"
							/>
						</label>
						{/* volume */}
						<label className="flex flex-col gap-2">
							<span className="text-sm text-grey">Volume</span>
							<input
								type="text"
								value={farmer?.productVolume}
								readOnly
								className="text-black text-base w-fit capitalize select-all outline-0 border-0"
							/>
						</label>
					</div>
				</div>
				<h6 className="my-1 text-base">Form Fields</h6>
				<ul className="w-full list-disc list-inside bg-grey/10 px-4 py-2 rounded-lg mb-4 text-grey">
					<li>
						Heard about CamberFarms from:{' '}
						<span className="capitalize">{farmer?.referralPlatform}</span>
					</li>
					<li>
						How would you prefer getting commisions:{' '}
						<span className="capitalize">{farmer?.aboutCommission}</span>
					</li>
				</ul>
				{/*  */}
				<textarea
					name=""
					id=""
					value={farmer?.aboutInterest}
					readOnly
					className="w-full resize-none border border-black bg-grey/10 px-4 py-2 rounded-lg text-grey"
				></textarea>

				<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
					<button
						type="button"
						onClick={goBack}
						className="bg-light-grey text-red-500 font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize"
					>
						reject
					</button>
					<button
						type="submit"
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize"
					>
						approve
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
