import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation, useParams } from 'react-router-dom'
import productImg from '../../assets/img/wheat-product.png'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { Farmer } from './MembershipTable'

export default function MembershipForm() {
	const goBack = useGoBack('/membership')
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
						membership form
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<div className="w-full min-h-40 bg-grey/10 p-6 rounded-lg mb-6">
					<h6 className="text-black dark:text-white font-semibold mb-6">
						User Information
					</h6>
					<div className="grid grid-cols-2 items-start gap-4 w-full h-full">
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Name</span>
							<input
								type="text"
								value={farmer?.name}
								readOnly
								className="text-black dark:text-white text-base capitalize select-all outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Phone number</span>
							<input
								type="text"
								value={farmer?.phone}
								readOnly
								className="text-black dark:text-white text-base w-fit select-all outline-0 border-0"
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
								className="text-black dark:text-white text-base w-fit select-all outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Country</span>
							<input
								type="text"
								value={farmer?.country}
								readOnly
								className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Gender</span>
							<input
								type="text"
								value={farmer?.gender}
								readOnly
								className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">State</span>
							<input
								type="text"
								value={farmer?.state}
								readOnly
								className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Date of Birth</span>
							<input
								type="text"
								value={farmer?.dob}
								readOnly
								className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Region</span>
							<input
								type="text"
								value={farmer?.region}
								readOnly
								className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
							/>
						</label>
					</div>
				</div>
				<div className="w-full bg-grey/10 p-4 rounded-lg mb-6">
					<h6 className="text-black dark:text-white font-semibold mb-4">
						Valid ID
					</h6>
					<div className="w-full h-50 relative flex items-center justify-center border border-grey/20 border-dashed rounded-lg">
						<img
							src={farmer?.validID}
							alt=""
							className="object-contain object-center h-full"
						/>
						{/* TODO remove this sample image */}
						{!farmer?.validID && (
							<img
								src={productImg}
								alt=""
								className="object-contain object-center h-full"
							/>
						)}
					</div>
				</div>

				<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
					<button
						disabled={farmer?.status === 'approved'}
						type="button"
						onClick={goBack}
						className="bg-light-grey text-red-500 font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-50 disabled:cursor-text"
					>
						reject
					</button>
					<button
						disabled={farmer?.status === 'approved'}
						type="submit"
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-50 disabled:cursor-text"
					>
						approve
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
