'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosInstance from '../api/axios'

type Inputs = {
	name: string
	phone: string
	email: string
	message: string
}

export default function MessageForm() {
	const t = useTranslations('contact.form')
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setIsLoading(true)
		// console.log(data)
		try {
			const res = await axiosInstance.post('/export/message', data)
			console.log(res.data)
			toast.success('Form submitted successfully!')
			// clear inputs
			reset()
		} catch (error: unknown) {
			toast.error('Error submitting form')
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
			className="w-full h-fit py-10 px-10 md:px-20 md:py-14 relative"
			id="message"
		>
			<h4 className="font-poppins capitalize font-bold text-primary text-xl sm:text-2xl">
				{t('heading')}
			</h4>
			<p className="mt-2 mb-8 text-dark-grey text-sm">{t('paragraph')}</p>
			<fieldset className="flex flex-col md:flex-row gap-6 mb-6">
				<label className="w-full">
					<input
						{...register('name', {
							required: true,
							minLength: 3,
							maxLength: 20,
						})}
						type="text"
						placeholder={t('placeholder.name')}
						className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
					/>
					{errors.name && (
						<span
							className="text-red-500 text-sm mt-1 ml-4 line-clamp-1"
							role="alert"
						>
							A valid name is required
						</span>
					)}
				</label>

				<label className="w-full">
					<input
						{...register('phone', {
							required: true,
							minLength: 4,
							maxLength: 14,
						})}
						type="tel"
						placeholder={t('placeholder.phone')}
						className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
					/>
					{errors.phone && (
						<span
							className="text-red-500 text-sm mt-1 ml-4 line-clamp-1"
							role="alert"
						>
							Phone number is required
						</span>
					)}
				</label>

				<label className="w-full">
					<input
						{...register('email', {
							required: true,
							minLength: 5,
							maxLength: 20,
						})}
						type="email"
						placeholder={t('placeholder.email')}
						className="w-full rounded-3xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
					/>
					{errors.email && (
						<span
							className="text-red-500 text-sm mt-1 ml-4 line-clamp-1"
							role="alert"
						>
							Email address is required
						</span>
					)}
				</label>
			</fieldset>
			<textarea
				{...register('message', {
					required: true,
					minLength: 10,
					maxLength: 200,
				})}
				placeholder={t('placeholder.message')}
				className="w-full h-28 resize-none rounded-2xl border outline-0 text-grey py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
			></textarea>
			{errors.message && (
				<span className="text-red-500 text-sm -mt-4 ml-2" role="alert">
					Please provide a valid message. Try to be as descriptive as possible
				</span>
			)}
			<button
				disabled={isLoading}
				className="w-fit ml-auto mr-0 mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out disabled:bg-slate-400 disabled:text-dark-grey disabled:cursor-not-allowed"
			>
				{t('placeholder.button')}
			</button>
		</form>
	)
}
