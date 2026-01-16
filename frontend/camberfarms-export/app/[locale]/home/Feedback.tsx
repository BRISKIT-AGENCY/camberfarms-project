'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axiosInstance from '../api/axios'

type Inputs = {
	name: string
	country: string
	phone: string
	email: string
	message: string
}

export default function Feedback() {
	const t = useTranslations('home.feedback')
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
			const res = await axiosInstance.post('/export/feedback', data)
			// TODO remove this log
			console.log('Res: ', res.data)
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
			className="w-full h-fit py-10 px-10 lg:px-12 md:py-14 relative text-dark-grey"
		>
			<h4 className="font-poppins capitalize font-bold text-primary text-2xl sm:text-3xl">
				{t('heading')}
			</h4>
			<p className="mt-2 mb-8">{t('paragraph')}</p>
			<fieldset className="flex flex-col gap-6">
				<input
					{...register('name', { required: true, maxLength: 20, minLength: 3 })}
					type="text"
					placeholder={t('placeholders.name')}
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.name && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid name is required
					</span>
				)}

				<input
					{...register('country', { required: true })}
					type="text"
					placeholder={t('placeholders.country')}
					className="w-full rounded-3xl border outline-0  py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.country && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						Country is required
					</span>
				)}

				<input
					{...register('phone', {
						required: true,
						maxLength: 13,
						minLength: 10,
					})}
					type="tel"
					placeholder={t('placeholders.phone')}
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.phone && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid phone number is required
					</span>
				)}

				<input
					{...register('email', { required: true })}
					type="email"
					placeholder={t('placeholders.email')}
					className="w-full rounded-3xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				/>
				{errors.email && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						A valid email is required
					</span>
				)}

				<textarea
					{...register('message', {
						required: true,
						minLength: 10,
						maxLength: 250,
					})}
					placeholder={t('placeholders.message')}
					className="w-full h-28 resize-none rounded-2xl border outline-0 py-2 px-4 focus-within:border-primary transition-all duration-200 ease-in-out focus-within:caret-primary focus-within:border-2"
				></textarea>
				{errors.message && (
					<span className="text-red-500 text-sm -mt-4 ml-4" role="alert">
						Message content is required
					</span>
				)}
			</fieldset>
			<button
				disabled={isLoading}
				className="w-fit ml-auto mr-0 mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out disabled:bg-slate-400 disabled:text-dark-grey disabled:cursor-not-allowed"
			>
				{t('button')}
			</button>
		</form>
	)
}
