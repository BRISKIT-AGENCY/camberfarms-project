'use client'

import { useState } from 'react'

const initialState = {
	name: '',
	country: '',
	phone: '',
	email: '',
	message: '',
}

export default function RequestQuotation() {
	const [formData, setFormData] = useState(initialState)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleChange(e: any) {
		e.preventDefault()

		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<form className="w-full h-fit py-10 px-10 lg:px-12 xl:px-20 md:py-14 relative">
			<h4 className="font-poppins capitalize font-bold text-black text-xl sm:text-2xl mb-8">
				request quotation
			</h4>
			<fieldset className="flex flex-col gap-6">
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="text"
					placeholder="Country"
					name="country"
					value={formData.country}
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
				<textarea
					placeholder="Type your message here..."
					name="message"
					value={formData.message}
					onChange={handleChange}
					className="w-full h-28 resize-none rounded-2xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				></textarea>
			</fieldset>
			<button className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out">
				send message
			</button>
		</form>
	)
}
