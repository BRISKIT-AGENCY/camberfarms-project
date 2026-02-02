import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { Affiliate } from './AffilateTable'

export default function AffiliateMembership() {
	const goBack = useGoBack('/affiliate')
	const params = useParams()
	const queryClient = useQueryClient()
	// fetch affiliate
	const {
		data: farmer,
		isPending,
		error,
	} = useQuery({
		queryKey: [`affiliate/${params.id}`],
		queryFn: async () => {
			const res = await axiosInstance.get(`affiliate/${params.id}`)
			return res.data.data as Affiliate
		},
	})
	// update status
	const { mutate, isPending: settingStatus } = useMutation({
		mutationKey: [`affiliate/${params.id}`],
		mutationFn: async (status: 'approved' | 'rejected') =>
			axiosInstance.patch(`affiliate/${params.id}/status`, { status }),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['affiliates', `affiliate/${params.id}`],
			}),
	})

	useEffect(() => {
		if (!params?.id) {
			setTimeout(goBack, 1000)
		}
	}, [params, goBack])

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<OverlayWrapper>
			{error && (
				<div className="w-full place-content-center p-8">
					<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
						<h1
							id="page-title"
							className="text-2xl lg:text-3xl capitalize font-bold"
						>
							affiliate form
						</h1>
						<IoClose size={30} className="cursor-pointer" onClick={goBack} />
					</div>
					<p className="mt-8 text-secondary">
						Unable to get affiliate details, please refresh or try again later.
					</p>
				</div>
			)}
			{farmer && (
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
						<h6 className="text-black dark:text-white font-semibold mb-6">
							User Information
						</h6>
						<div className="grid grid-cols-2 items-start gap-4 w-full h-full">
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Name</span>
								<input
									type="text"
									value={farmer?.fullName}
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
								<span className="text-sm text-grey">Status</span>
								<input
									type="text"
									value={farmer?.status}
									readOnly
									className={`text-base w-fit select-all capitalize outline-0 border-0 ${farmer?.status == 'approved' ? 'text-primary' : 'text-[#FF8D28]'}`}
								/>
							</label>
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">State</span>
								<input
									type="text"
									value={farmer?.city}
									readOnly
									className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
								/>
							</label>
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Date</span>
								<input
									type="text"
									value={new Date(farmer?.createdAt || '').toLocaleString()}
									readOnly
									className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
								/>
							</label>
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Region</span>
								<input
									type="text"
									value={farmer?.country}
									readOnly
									className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
								/>
							</label>
						</div>
					</div>
					<div className="w-full min-h-40 bg-grey/10 p-6 rounded-lg mb-6">
						<h6 className="text-black dark:text-white font-semibold mb-4">
							Buyer's Information (*If Available)
						</h6>
						<div className="grid grid-cols-2 items-start gap-2 w-full h-full">
							{/* buyer's name */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Name</span>
								<input
									type="text"
									value={farmer?.fullName}
									readOnly
									className="text-black dark:text-white text-base capitalize select-all outline-0 border-0"
								/>
							</label>
							{/* product */}
							<label className="flex flex-col gap-2">
								<span className="text-sm text-grey">Product</span>
								<input
									type="text"
									value={farmer?.buyerProduct}
									readOnly
									className="text-black dark:text-white text-base w-fit capitalize select-all outline-0 border-0"
								/>
							</label>
							{/* country */}
							<label className="flex flex-col gap-2">
								<span className="text-sm text-grey">Country</span>
								<input
									type="text"
									value={farmer?.buyerCountry}
									readOnly
									className="text-black dark:text-white text-base w-fit capitalize select-all outline-0 border-0"
								/>
							</label>
							{/* volume */}
							<label className="flex flex-col gap-2">
								<span className="text-sm text-grey">Volume</span>
								<input
									type="text"
									value={farmer?.productVolume}
									readOnly
									className="text-black dark:text-white text-base w-fit capitalize select-all outline-0 border-0"
								/>
							</label>
						</div>
					</div>
					<h6 className="my-1 text-base">Form Fields</h6>
					<ul className="w-full list-disc list-inside bg-grey/10 px-4 py-2 rounded-lg mb-4 text-grey dark:text-light-grey">
						<li>
							Heard about CamberFarms from:{' '}
							<span className="capitalize">
								{farmer?.referralPlatform || farmer?.referralPlatformOthers}
							</span>
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
						className="w-full resize-none border border-black dark:border-dark-grey bg-grey/10 px-4 py-2 rounded-lg text-grey dark:text-light-grey"
					></textarea>

					<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
						<button
							type="button"
							onClick={() => mutate('rejected')}
							disabled={settingStatus || farmer?.status == 'rejected'}
							className="bg-light-grey text-red-500 font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-40"
						>
							reject
						</button>
						<button
							type="button"
							onClick={() => mutate('approved')}
							disabled={settingStatus || farmer?.status == 'approved'}
							className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-40"
						>
							approve
						</button>
					</div>
				</section>
			)}
		</OverlayWrapper>
	)
}
