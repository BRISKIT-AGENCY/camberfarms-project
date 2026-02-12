// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import closeIcon from '../../../assets/icon/close.svg'
import OverlayWrapper from '../../../components/OverlayWrapper'
import { useGoBack } from '../../../hooks/useGoBack'
import { useRequestOTP } from '../../../hooks/useRequestOTP'

export default function ForgotPassword() {
	const navigate = useNavigate()
	const { mutateAsync, isPending } = useRequestOTP()
	const goBack = useGoBack('login')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { email: '' } })

	async function onSubmit(data: { email: string }) {
		await mutateAsync(data)
		navigate('/account/verification', { state: { email: data.email } })
		// resetTimer()
	}

	return (
		<OverlayWrapper fullWidth={false}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-md pb-4 px-2 flex flex-col gap-2 bg-white text-black relative text-center dark:bg-black dark:text-white"
			>
				<img
					src={closeIcon}
					className="w-10 aspect-square absolute top-0 right-0 cursor-pointer"
					alt="close"
					onClick={goBack}
				/>
				<h2 className="text-3xl font-semibold text-center text-primary ">
					Verify email address
				</h2>
				<p className="text-center mb-6">
					Enter your email address to reset password
				</p>

				{/* Username */}
				<div className="mb-4">
					<label
						className="text-lg text-grey/50 dark:text-light-grey mb-2 block text-start"
						htmlFor="username"
					>
						Email address
					</label>
					<input
						type="text"
						id="email"
						placeholder="Enter your email address"
						{...register('email', { required: true })}
						className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">
							A valid email address is required
						</p>
					)}
				</div>
				<button
					type="submit"
					disabled={isPending}
					className="w-full text-center bg-primary text-white py-2 px-6 font-medium font-poppins text-lg cursor-pointer rounded-lg disabled:opacity-50"
				>
					Continue
				</button>
			</form>
		</OverlayWrapper>
	)
}
