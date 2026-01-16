'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axiosInstance from '../api/axios'

type Inputs = {
	fullName: string
	phone: string
	email: string
	country: string
	city: string
	understandTerms: string
	haveABuyer: string
	buyerCountry: string
	buyerProduct: string
	productVolume: string
	aboutInterest: string
	aboutCommission: string
	referralPlatform: string
	referralPlatformOthers: string
}

export default function AffiliateForm() {
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setIsLoading(true)
		console.log(data)
		try {
			const res = await axiosInstance.post('/affiliate', data)
			console.log(res.data)
			// clear inputs
			reset()
		} catch (error: unknown) {
			console.error('error submitting form: ', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			onKeyDown={(e) => {
				// submit form on Ctrl+Enter
				if (e.ctrlKey && e.key === 'Enter') handleSubmit(onSubmit)()
			}}
			className="w-full h-fit py-10 px-10 md:px-20 md:py-14 relative font-inter text-dark-grey"
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
			<fieldset className="flex flex-col gap-6 mb-6">
				<input
					{...register('fullName', {
						required: true,
						minLength: 4,
						maxLength: 20,
					})}
					type="text"
					placeholder="Full name"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.fullName && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid name is required
					</span>
				)}

				<input
					{...register('email', { required: true })}
					type="email"
					placeholder="Email"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.email && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid email address is required
					</span>
				)}

				<input
					{...register('phone', {
						required: true,
						minLength: 10,
						maxLength: 14,
					})}
					type="tel"
					placeholder="Phone number"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.phone && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid phone number is required
					</span>
				)}

				<input
					{...register('country', { required: true })}
					type="text"
					placeholder="Country"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.country && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid country is required
					</span>
				)}

				<input
					{...register('city', { required: true })}
					type="text"
					placeholder="City"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.city && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid city is required
					</span>
				)}
			</fieldset>
			<fieldset className="w-full flex">
				<legend className="flex-1">
					Do you truly understand the terms of commission as an export brokerage
					above?
				</legend>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						{...register('understandTerms', { required: true })}
						type="radio"
						// name="understandTerms"
						value="yes"
						id="understand-terms-yes"
						className="accent-primary"
					/>
					<span>yes</span>
				</label>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						{...register('understandTerms')}
						type="radio"
						// name="understandTerms"
						value="no"
						id="understand-terms-no"
						className="accent-primary"
					/>
					<span>no</span>
				</label>
			</fieldset>
			<fieldset className="w-full flex my-6">
				<legend className="flex-1">Do you have a buyer already?</legend>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						{...register('haveABuyer', { required: true })}
						type="radio"
						// name="haveABuyer"
						value="yes"
						id="have-a-buyer-yes"
						className="accent-primary"
					/>
					<span>yes</span>
				</label>
				<label className="flex items-center gap-1 text-grey capitalize mr-4">
					<input
						{...register('haveABuyer')}
						type="radio"
						// name="haveABuyer"
						value="no"
						id="have-a-buyer-no"
						className="accent-primary"
					/>
					<span>no</span>
				</label>
			</fieldset>
			<fieldset className="flex flex-col gap-6 mb-6">
				<legend className="mb-4 text-dark-grey">
					*If you selected “yes” fill out your buyers details below
				</legend>
				<input
					{...register('buyerCountry', {
						// minLength: 3,
						validate: {
							// if user has a buyer, this field is required
							checkBuyer: (buyerCountry, { haveABuyer }) => {
								if (haveABuyer === 'yes' && !buyerCountry)
									return "Please provide your buyer's country"
							},
						},
					})}
					type="text"
					placeholder="Buyer's country"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.buyerCountry && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						{errors.buyerCountry.message}
					</span>
				)}

				<input
					{...register('buyerProduct', {
						minLength: 3,
						validate: {
							// if user has a buyer, this field is required
							checkBuyer: (buyerProduct, { haveABuyer }) => {
								if (haveABuyer === 'yes' && !buyerProduct)
									return "Please provide your buyer's selected product"
							},
						},
					})}
					type="text"
					autoComplete="off"
					placeholder="Buyer's products"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.buyerProduct && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						{errors.buyerProduct.message}
					</span>
				)}

				<input
					{...register('productVolume', {
						validate: {
							// if user has a buyer, this field is required
							checkBuyer: (productVolume, { haveABuyer }) => {
								if (haveABuyer === 'yes' && !productVolume)
									return 'Please provide a valid product volume'
							},
						},
					})}
					type="text"
					autoComplete="off"
					placeholder="Product volume"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.productVolume && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						{errors.productVolume.message}
					</span>
				)}

				<input
					{...register('aboutInterest', {
						required: true,
						minLength: 10,
						maxLength: 200,
					})}
					type="text"
					placeholder="Tell us about your interest in our affiliate program"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.aboutInterest && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						Please tell us about your interest in our affiliate program
					</span>
				)}

				<input
					{...register('aboutCommission', { required: true })}
					type="text"
					placeholder="How would you prefer your commissions to be paid?"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.aboutCommission && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						How would you prefer your commissions to be paid?
					</span>
				)}

				<select
					{...register('referralPlatform', {
						validate: {
							// user must select a referral platform or fill the field below
							selectPlatform: (
								referralPlatform,
								{ referralPlatformOthers }
							) => {
								if (!referralPlatformOthers && !referralPlatform)
									return 'Please how did you hear about us?'
							},
						},
					})}
					className="w-full rounded-xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				>
					<option value="">How did you hear about us?</option>
					<option value="facebook">Facebook</option>
					<option value="instagram">Instagram</option>
					<option value="linkedIn">LinkedIn</option>
					<option value="x">X (Twitter)</option>
					<option value="website">Website</option>
				</select>
				{errors.referralPlatform && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						{errors.referralPlatform.message}
					</span>
				)}

				<input
					{...register('referralPlatformOthers', {
						minLength: 3,
						maxLength: 15,
						validate: {
							// check if user has selected referral platform
							selectPlatform: (_, { referralPlatform }) => {
								if (!referralPlatform)
									return 'Please how did you hear about us?'
							},
						},
					})}
					type="text"
					autoComplete="off"
					placeholder="If other medium please state"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
			</fieldset>
			<button
				disabled={isLoading}
				className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out disabled:bg-slate-400 disabled:text-dark-grey disabled:cursor-not-allowed"
			>
				submit
			</button>
		</form>
	)
}
