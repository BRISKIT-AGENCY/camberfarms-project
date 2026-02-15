import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { FarmFundEnquiry } from '../../types/farm-fund'

export default function ViewFarmFundEnquiry() {
	const params = useParams()
	const navigate = useNavigate()
	const goBack = useGoBack('/farm-fund-form')
	const {
		data: enquiry,
		isPending,
		error,
	} = useQuery({
		queryKey: ['farm-fund', params.enquiryId],
		queryFn: async () => {
			const res = await axiosInstance.get(`farm-fund/${params.enquiryId}`)
			return res.data.data as FarmFundEnquiry
		},
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (!params?.enquiryId) {
			const timer = setTimeout(goBack, 1000)
			return () => clearTimeout(timer)
		}
	}, [params, goBack])

	if (isPending) return <LoadingSpinner />

	return (
		<OverlayWrapper>
			{!enquiry ||
				(error && (
					<div className="w-full place-content-center p-8">
						<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
							<h1
								id="page-title"
								className="text-2xl lg:text-3xl capitalize font-bold"
							>
								Enquiry Details
							</h1>
							<IoClose size={30} className="cursor-pointer" onClick={goBack} />
						</div>
						<p className="mt-8 text-secondary">
							Unable to get Farm Fund details, please refresh or try again
							later.
						</p>
					</div>
				))}
			{enquiry && (
				<section className="w-full">
					<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
						<h1
							id="page-title"
							className="text-2xl lg:text-3xl capitalize font-bold"
						>
							Enquiry Details
						</h1>
						<IoClose size={30} className="cursor-pointer" onClick={goBack} />
					</div>
					<div className="w-full min-h-40 bg-grey/10 p-6 rounded-lg mb-6">
						<h6 className="text-black dark:text-white font-semibold mb-6">
							Customer Information
						</h6>
						<div className="grid grid-cols-2 items-start gap-6 w-full h-full">
							<label className="flex flex-col gap-1">
								{/* name */}
								<span className="text-sm text-grey">Name</span>
								<input
									type="text"
									value={enquiry?.name}
									readOnly
									className="text-black dark:text-white text-base capitalize select-all outline-0 border-0"
								/>
							</label>
							{/* email */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey select-all">
									Email Address
								</span>
								<input
									type="text"
									value={enquiry?.email}
									readOnly
									className="text-black dark:text-white text-base w-full select-all outline-0 border-0"
								/>
							</label>
							{/* phone number */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Phone number</span>
								<input
									type="text"
									value={enquiry?.phone}
									readOnly
									className="text-black dark:text-white text-base w-fit select-all outline-0 border-0"
								/>
							</label>
							{/* date */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Date submitted</span>
								<input
									type="text"
									value={new Date(enquiry?.createdAt).toDateString()}
									readOnly
									className="text-black dark:text-white text-base w-fit select-all capitalize outline-0 border-0"
								/>
							</label>
						</div>
					</div>
					<div className="w-full min-h-40 bg-grey/10 p-6 rounded-lg mb-6">
						<h6 className="text-black dark:text-white font-semibold mb-4">
							Enquiry Details
						</h6>
						<div className="grid grid-cols-[2fr_1fr] items-start gap-2 w-full h-full">
							{/* subject */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Subject</span>
								<input
									type="text"
									value={'Enquiry from Farm Fund'}
									readOnly
									className="text-black dark:text-white text-base capitalize select-all outline-0 border-0"
								/>
							</label>
							{/* status */}
							<label className="flex flex-col gap-2">
								<span className="text-sm text-grey">Status</span>
								<input
									type="text"
									value={enquiry?.status}
									readOnly
									className={`text-base w-fit capitalize select-all outline-0 border-0 ${enquiry?.status === 'new' ? 'text-[#0088FF]' : enquiry?.status === 'pending' ? 'text-[#FF8D28]' : 'text-primary'}`}
								/>
							</label>
						</div>
					</div>
					{/* message */}
					<h6 className="my-1 text-base">Message</h6>
					<textarea
						name="message"
						id=""
						value={enquiry?.message}
						readOnly
						className="w-full resize-none bg-grey/10 px-4 py-2 rounded-lg text-grey border-0 outline-0 focus-within:border focus-within:border-primary dark:text-light-grey dark:bg-dark-grey"
					></textarea>

					{enquiry.adminReply && (
						<>
							<h6 className="my-1 text-base">Your reply</h6>
							<textarea
								name="adminReply"
								value={enquiry?.adminReply}
								readOnly
								className="w-full resize-none bg-grey/10 px-4 py-2 rounded-lg text-grey border-0 outline-0 focus-within:border focus-within:border-primary dark:text-light-grey dark:bg-dark-grey"
							></textarea>
						</>
					)}

					<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
						<button
							type="button"
							onClick={() => navigate('/farm-fund-form')}
							className="bg-light-grey text-black dark:text-white dark:bg-dark-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize"
						>
							cancel
						</button>
						<button
							type="button"
							onClick={() => navigate(`/farm-fund-form/reply/${enquiry?._id}`)}
							disabled={Boolean(enquiry.adminReply)}
							className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-40"
						>
							reply message
						</button>
					</div>
				</section>
			)}
		</OverlayWrapper>
	)
}
