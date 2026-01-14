'use client'

import { useState } from 'react'

const initialState = {
	fullName: '',
	phone: '',
	email: '',
	country: '',
	city: '',
	understandTerms: '',
	haveABuyer: '',
	buyerCountry: '',
	buyerProduct: '',
	productVolume: '',
	aboutInterest: '',
	aboutCommission: '',
	referralPlatform: '',
	referralPlatformOthers: '',
}

export default function AffiliateForm() {
	const [formData, setFormData] = useState(initialState)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleChange(e: any) {
		e.preventDefault()

		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<form
			className="w-full h-fit py-10 px-10 md:px-20 md:py-14 relative font-inter"
			id="message"
		>
			<h4 className="font-inter uppercase font-medium text-black text-xl sm:text-2xl">
				START YOUR JOURNEY WITH CAMBERFARMS TODAY!
			</h4>
			<p className="mt-2 mb-8 text-dark-grey text-sm">
				Ready to take your brokerage or marketing career to the next level? Join
				the Camberfarms Affiliate Program and become a key player in the
				thriving agro-export industry.
			</p>
			<fieldset className="flex flex-col gap-6 mb-6 text-grey">
				<input
					type="text"
					placeholder="Full name"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={formData.email}
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
					type="text"
					placeholder="Country"
					name="country"
					value={formData.country}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="text"
					placeholder="City"
					name="city"
					value={formData.city}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
			</fieldset>
			<fieldset className="w-full flex">
				<legend className="flex-1">
					Do you truly understand the terms of commission as an export brokerage
					above?
				</legend>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						type="radio"
						name="understandTerms"
						value={formData.understandTerms}
						id="understand-terms"
						className="accent-primary"
					/>
					<span>yes</span>
				</label>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						type="radio"
						name="understandTerms"
						value={formData.understandTerms}
						id="understand-terms"
						className="accent-primary"
					/>
					<span>no</span>
				</label>
			</fieldset>
			<fieldset className="w-full flex my-6">
				<legend className="flex-1">Do you have a buyer already?</legend>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						type="radio"
						name="haveABuyer"
						value={formData.haveABuyer}
						id="have-a-buyer"
						className="accent-primary"
					/>
					<span>yes</span>
				</label>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						type="radio"
						name="haveABuyer"
						value={formData.haveABuyer}
						id="have-a-buyer"
						className="accent-primary"
					/>
					<span>no</span>
				</label>
			</fieldset>
			<fieldset className="flex flex-col gap-6 mb-6 text-grey">
				<legend className="mb-4 text-dark-grey">
					*If you selected “yes” fill out your buyers details below
				</legend>
				<input
					type="text"
					placeholder="Buyer's country"
					name="buyerCountry"
					value={formData.buyerCountry}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="text"
					placeholder="Buyer's products"
					name="buyerProduct"
					value={formData.buyerProduct}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="text"
					placeholder="Product volume"
					name="productVolume"
					value={formData.productVolume}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="text"
					placeholder="Tell us about your interest in our affiliate program"
					name="aboutInterest"
					value={formData.aboutInterest}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<input
					type="text"
					placeholder="How would you prefer your commissions to be paid?"
					name="aboutCommission"
					value={formData.aboutCommission}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				<select
					name="referralPlatform"
					value={formData.referralPlatform}
					onChange={handleChange}
					className="w-full rounded-xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				>
					<option value="">How did you hear about us?</option>
					<option value="Facebook">Facebook</option>
					<option value="Instagram">Instagram</option>
					<option value="LinkedIn">LinkedIn</option>
					<option value="X (Twitter)">X (Twitter)</option>
				</select>
				<input
					type="text"
					placeholder="If other medium please state"
					name="referralPlatformOthers"
					value={formData.referralPlatformOthers}
					onChange={handleChange}
					className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
			</fieldset>
			<button className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out">
				submit
			</button>
		</form>
	)
}
