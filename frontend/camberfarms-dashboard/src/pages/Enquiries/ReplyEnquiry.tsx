import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import OverlayWrapper from '../../components/OverlayWrapper'
// import { useGoBack } from '../../hooks/useGoBack'
import toast from 'react-hot-toast'
import type { Enquiry } from '../../types/enquiry'

type EnquiryReply = {
	status: 'pending' | 'read'
	adminReply: string
}

export default function ReplyEnquiry() {
	const navigate = useNavigate()
	const goBack = () => navigate('/enquiries')
	const queryClient = useQueryClient()
	const [adminReply, setAdminReply] = useState('')
	const params = useParams()
	const { data, isPending, isRefetching, error } = useQuery({
		queryKey: ['enquiries', `${params.enquiryId}`],
		queryFn: async () => {
			const res = await axiosInstance.get(
				`enquiries/${params.type}/${params.enquiryId}`,
			)
			return res.data as {
				enquiry: Enquiry
			}
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})

	const { mutate, isPending: replying } = useMutation({
		mutationFn: async (data: EnquiryReply) => {
			const res = await axiosInstance.post(
				`enquiries/${params.type}/${params.enquiryId}/reply`,
				data,
			)
			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['enquiries'] })
			toast.success('Reply sent!')
			goBack()
		},
	})

	const enquiry = data?.enquiry

	function replyEnquiry() {
		mutate({ status: 'read', adminReply })
	}

	useEffect(() => {
		if (!params.type && !params?.enquiryId) {
			setTimeout(goBack, 1000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params])

	if (isPending || isRefetching) return <div>Loading...</div>

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<OverlayWrapper>
			<section className="w-full pt-10">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<div className="">
						<h1
							id="page-title"
							className="text-2xl lg:text-3xl capitalize font-bold"
						>
							Reply To Enquiry
						</h1>
						<p className="text-grey">
							Responding to: <span>{enquiry?.sourceModel} enquiry</span>
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
								className="text-dark-grey dark:text-light-grey text-base capitalize select-all outline-0 border dark:border-grey rounded-lg w-full p-2"
							/>
						</label>
						{/* subject */}
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Subject</span>
							<input
								type="text"
								value={`Enquiry from ${enquiry?.sourceModel} form`}
								readOnly
								className="text-dark-grey dark:text-light-grey dark:border-grey text-base select-all outline-0 border rounded-lg w-full p-2"
							/>
						</label>
						{/* message */}
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey select-all">Message</span>
							<textarea
								name="mesage"
								readOnly={Boolean(enquiry?.adminReply)}
								value={enquiry?.adminReply || adminReply}
								onChange={(e) => setAdminReply(e.target.value)}
								id="message"
								placeholder="Type your reply message here"
								className="w-full h-40 resize-none border border-grey px-4 p-2 rounded-lg read-only:bg-light-grey read-only:outline-0 read-only:border-primary"
							></textarea>
						</label>
					</fieldset>
				</form>

				<h6 className="my-1 text-base">Original message</h6>
				<div className="w-full flex flex-col bg-light-grey px-4 py-2 rounded-lg mb-2 text-grey dark:bg-dark-grey dark:text-light-grey">
					<p>
						From: <span className="capitalize">{enquiry?.name}</span>{' '}
						{`<${enquiry?.email}>`}
					</p>
					<p>Date: {new Date(enquiry?.createdAt || '').toDateString()}</p>
					<p>Subject: {enquiry?.sourceModel}</p>
				</div>
				{/*  */}
				<textarea
					name=""
					id=""
					value={enquiry?.message}
					readOnly
					className="w-full resize-none bg-light-grey dark:bg-dark-grey px-4 py-2 rounded-lg text-grey dark:text-light-grey"
				></textarea>

				<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
					<button
						type="button"
						onClick={goBack}
						className="bg-light-grey text-grey dark:text-light-grey dark:bg-dark-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize"
					>
						cancel
					</button>
					<button
						type="button"
						disabled={replying || Boolean(enquiry?.adminReply)}
						onClick={replyEnquiry}
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-50"
					>
						{enquiry?.adminReply ? 'Already Replied' : 'Send Message'}
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
