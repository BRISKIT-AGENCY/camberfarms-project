'use client'

import { useState } from 'react'

const initialState = {
	name: '',
	phone: '',
	email: '',
	message: '',
}

export default function MessageForm() {
	const [formData, setFormData] = useState(initialState)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleChange(e: any) {
		e.preventDefault()

		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<form
			className="w-full h-fit py-10 px-10 md:px-20 md:py-14 relative"
			id="message"
		>
			<h4 className="font-poppins capitalize font-bold text-primary text-xl sm:text-2xl">
				send us a message
			</h4>
			<p className="mt-2 mb-8 text-dark-grey text-sm">
				Fill out the form below and our export team will get back to you within
				24 hours.
			</p>
			<fieldset className="flex flex-col md:flex-row gap-6 mb-6">
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="tel"
					placeholder="Phone number"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="email"
					placeholder="Email address"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
			</fieldset>
			<textarea
				placeholder="Type your message here..."
				name="message"
				value={formData.message}
				onChange={handleChange}
				className="w-full h-28 resize-none rounded-2xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
			></textarea>
			<button className="w-fit ml-auto mr-0 mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out">
				send enquiry
			</button>
		</form>
	)
}
