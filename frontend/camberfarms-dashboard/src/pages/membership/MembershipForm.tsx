import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { Membership } from '../../types/membership'

export default function MembershipForm() {
	const goBack = useGoBack('/membership')
	const params = useParams()

	const queryClient = useQueryClient()
	// fetch membership
	const {
		data: farmer,
		isPending,
		error,
		isRefetching,
	} = useQuery({
		queryKey: [`membership/${params.id}`],
		queryFn: async () => {
			const res = await axiosInstance.get(`membership/${params.id}`)
			return res.data.data as Membership
		},
	})
	// update status
	const { mutate, isPending: settingStatus } = useMutation({
		mutationKey: [`membership/${params.id}`],
		mutationFn: async (status: 'approved' | 'reject') =>
			axiosInstance.patch(`membership/${params.id}/status`, { status }),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['membership', `membership/${params.id}`],
			}),
	})

	useEffect(() => {
		if (!params?.id) {
			setTimeout(goBack, 1000)
		}
	}, [params, goBack])

	if (isPending || isRefetching)
		return <div className="w-full text-center">Loading...</div>

	return (
		<OverlayWrapper>
			{error && (
				<div className="w-full place-content-center p-8">
					<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
						<h1
							id="page-title"
							className="text-2xl lg:text-3xl capitalize font-bold"
						>
							membership form
						</h1>
						<IoClose size={30} className="cursor-pointer" onClick={goBack} />
					</div>
					<p className="mt-8 text-secondary">
						Unable to get affiliate membership, please refresh or try again
						later.
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
									value={new Date(farmer.dateOfBirth).toDateString()}
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
						<div className="w-full h-50 relative flex items-center justify-center gap-6 flex-wrap border border-grey/20 border-dashed rounded-lg">
							{farmer.idFiles &&
								farmer.idFiles.map((img) => (
									<img
										key={img}
										src={img}
										alt=""
										className="object-contain object-center h-full"
									/>
								))}
						</div>
					</div>

					<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
						<button
							disabled={farmer?.status === 'reject' || settingStatus}
							type="button"
							onClick={() => mutate('reject')}
							className="bg-light-grey text-red-500 font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-50 disabled:cursor-text"
						>
							reject
						</button>
						<button
							disabled={farmer?.status === 'approved' || settingStatus}
							type="button"
							onClick={() => mutate('approved')}
							className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-50 disabled:cursor-text"
						>
							approve
						</button>
					</div>
				</section>
			)}
		</OverlayWrapper>
	)
}
