'use client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axiosInstance from '../../api/axios'

type Inputs = {
	name: string
	phone: string
	email: string
	country: string
	message: string
}

export default function RequestQuotation() {
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
			const res = await axiosInstance.post('/export/feedback', data)
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
			className="w-full h-fit py-10 px-10 lg:px-12 xl:px-20 md:py-14 relative"
		>
			<h4 className="font-poppins capitalize font-bold text-black text-xl sm:text-2xl mb-8">
				request quotation
			</h4>
			<fieldset className="flex flex-col gap-6">
				<input
					{...register('name', {
						required: true,
						minLength: 3,
						maxLength: 20,
					})}
					type="text"
					placeholder="Name"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.name && (
					<span
						className="text-red-500 text-sm -mt-4 ml-4 line-clamp-1"
						role="alert"
					>
						A valid name is required
					</span>
				)}

				<input
					{...register('country', {
						required: true,
						minLength: 3,
						maxLength: 20,
					})}
					type="text"
					placeholder="Country"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.country && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						Please provide your country
					</span>
				)}

				<input
					{...register('phone', {
						required: true,
						minLength: 4,
						maxLength: 14,
					})}
					type="tel"
					placeholder="Phone number"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.phone && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						Please provide a valid phone number
					</span>
				)}

				<input
					{...register('email', {
						required: true,
						minLength: 5,
						maxLength: 20,
					})}
					type="email"
					placeholder="Email address"
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.email && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						Email address is required
					</span>
				)}
				<textarea
					{...register('message', {
						required: true,
						minLength: 10,
						maxLength: 200,
					})}
					placeholder="Type your message here..."
					className="w-full h-28 resize-none rounded-2xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				></textarea>
				{errors.message && (
					<span className="text-red-500 text-sm -mt-4 ml-2" role="alert">
						Please provide a valid message. Try to be as descriptive as possible
					</span>
				)}
			</fieldset>
			<button
				disabled={isLoading}
				className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out disabled:text-dark-grey disabled:cursor-not-allowed"
			>
				send message
			</button>
		</form>
	)
}
