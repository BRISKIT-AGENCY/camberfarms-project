import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { FarmFundEnquiry } from '../../types/farm-fund'

type ReplyType = {
	adminReply: string
	status: 'read' | 'pending'
}

export default function ReplyFarmFundEnquiry() {
	const goBack = useGoBack('/farm-fund-form')

	const params = useParams()
	const queryClient = useQueryClient()
	// fetch farm-fund/id
	const {
		data: enquiry,
		isPending,
		error,
	} = useQuery({
		queryKey: ['farm-fund', params.enquiryId],
		queryFn: async () => {
			const res = await axiosInstance.get(`farm-fund/${params.enquiryId}`)
			// console.log('farm fund: ', res.data.data)
			return res.data.data as FarmFundEnquiry
		},
	})
	// reply farm-fund
	const { mutate, isPending: addingReply } = useMutation({
		mutationKey: ['affiliates', params.id],
		mutationFn: async (data: ReplyType) =>
			axiosInstance.patch(`farm-fund/${params.enquiryId}`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [params.id] }),
	})

	const [adminReply, setAdminReply] = useState(enquiry?.adminReply)

	function replyFarmFund() {
		if (adminReply)
			mutate({
				adminReply,
				status: 'read',
			})
	}

	useEffect(() => {
		if (!params?.enquiryId) {
			setTimeout(goBack, 1000)
		}
	}, [params, goBack])

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<OverlayWrapper>
			{error && (
				<div className="w-full">
					<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
						<div className="">
							<h1
								id="page-title"
								className="text-2xl lg:text-3xl capitalize font-bold"
							>
								Reply To Farm Fund Form
							</h1>
							<p className="text-grey">
								Responding to: <span className="capitalize">unknown</span>
							</p>
						</div>
						<IoClose size={30} className="cursor-pointer" onClick={goBack} />
					</div>
					<p className="mt-8 text-secondary">
						Unable to get Farm Fund details, please refresh or try again later.
					</p>
				</div>
			)}
			{enquiry && (
				<section className="w-full pt-10">
					<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
						<div className="">
							<h1
								id="page-title"
								className="text-2xl lg:text-3xl capitalize font-bold"
							>
								Reply To Farm Fund Form
							</h1>
							<p className="text-grey">
								Responding to:{' '}
								<span className="capitalize">{enquiry?.name}</span>
							</p>
						</div>
						<IoClose size={30} className="cursor-pointer" onClick={goBack} />
					</div>
					<form className="w-full min-h-40 p-6 rounded-lg mb-6">
						<fieldset className="grid grid-cols-1 items-start gap-4 w-full h-full">
							{/* name */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Message to</span>
								<input
									type="text"
									value={enquiry?.name}
									readOnly
									className="text-grey dark:text-light-grey dark:border-grey text-base capitalize select-all outline-0 border rounded-lg w-full p-2"
								/>
							</label>
							{/* subject */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey">Subject</span>
								<input
									type="text"
									value={'Enquiry from Farm Fund'}
									readOnly
									className="text-grey dark:text-light-grey dark:border-grey text-base select-all outline-0 border rounded-lg w-full p-2"
								/>
							</label>
							{/* message */}
							{/* if already replied, make input readOnly */}
							<label className="flex flex-col gap-1">
								<span className="text-sm text-grey select-all">Message</span>
								<textarea
									name="mesage"
									id="message"
									value={adminReply}
									onChange={(e) => setAdminReply(e.target.value)}
									readOnly={Boolean(enquiry.adminReply)}
									placeholder="Type your reply message here"
									className="w-full h-40 resize-none border border-grey px-4 p-2 rounded-lg read-only:bg-light-grey read-only:border-primary read-only:text-grey dark:read-only:bg-dark-grey dark:read-only:text-light-grey"
								></textarea>
							</label>
						</fieldset>
					</form>

					<h6 className="my-1 text-base">Client's message</h6>
					<div className="w-full flex flex-col bg-light-grey px-4 py-2 rounded-lg mb-2 text-grey dark:bg-dark-grey dark:text-light-grey">
						<p>
							From: <span className="capitalize">{enquiry?.name}</span>{' '}
							{`<${enquiry?.email}>`}
						</p>
						<p>Date: {enquiry?.createdAt}</p>
						<p>Subject: {'Enquiry from Farm Fund'}</p>
					</div>
					{/*  */}
					<textarea
						name=""
						id=""
						value={enquiry?.message}
						readOnly
						className="w-full resize-none bg-light-grey px-4 py-2 rounded-lg text-grey dark:bg-dark-grey dark:text-light-grey"
					></textarea>

					<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
						<button
							type="button"
							onClick={goBack}
							className="bg-light-grey text-grey dark:bg-dark-grey dark:text-light-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize"
						>
							cancel
						</button>
						<button
							type="button"
							onClick={replyFarmFund}
							disabled={addingReply || Boolean(enquiry.adminReply)}
							className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-60"
						>
							Send Message
						</button>
					</div>
				</section>
			)}
		</OverlayWrapper>
	)
}
