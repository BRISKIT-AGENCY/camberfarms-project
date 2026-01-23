import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation, useParams } from 'react-router-dom'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { FarmFundEnquiry } from './FarmFundTable'

export default function ReplyFarmFundEnquiry() {
	const goBack = useGoBack('/farm-fund-form')
	const location = useLocation()
	const enquiry: FarmFundEnquiry | null = location.state?.enquiry
	const params = useParams()

	useEffect(() => {
		if (!params?.enquiryId) {
			setTimeout(goBack, 1000)
		}
	}, [params, goBack])

	return (
		<OverlayWrapper>
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
							Responding to: <span className="capitalize">{enquiry?.name}</span>
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
								className="text-grey text-base capitalize select-all outline-0 border rounded-lg w-full p-2"
							/>
						</label>
						{/* subject */}
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey">Subject</span>
							<input
								type="text"
								value={enquiry?.subject}
								readOnly
								className="text-grey text-base select-all outline-0 border rounded-lg w-full p-2"
							/>
						</label>
						{/* message */}
						<label className="flex flex-col gap-1">
							<span className="text-sm text-grey select-all">Message</span>
							<textarea
								name="mesage"
								id="message"
								placeholder="Type your reply message here"
								className="w-full h-40 resize-none border border-grey px-4 p-2 rounded-lg"
							></textarea>
						</label>
					</fieldset>
				</form>

				<h6 className="my-1 text-base">Client's message</h6>
				<div className="w-full flex flex-col bg-light-grey px-4 py-2 rounded-lg mb-2 text-grey">
					<p>
						From: <span className="capitalize">{enquiry?.name}</span>{' '}
						{`<${enquiry?.email}>`}
					</p>
					<p>Date: {enquiry?.date}</p>
					<p>Subject: {enquiry?.subject}</p>
				</div>
				{/*  */}
				<textarea
					name=""
					id=""
					value={enquiry?.message}
					readOnly
					className="w-full resize-none bg-light-grey px-4 py-2 rounded-lg text-grey"
				></textarea>

				<div className="w-full flex gap-6 items-center justify-end py-4 mt-4 border-t border-grey/40">
					<button
						type="button"
						onClick={goBack}
						className="bg-light-grey text-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize"
					>
						cancel
					</button>
					<button
						type="submit"
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer capitalize disabled:opacity-60"
					>
						Send Message
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
