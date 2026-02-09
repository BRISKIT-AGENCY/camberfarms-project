import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import OverlayWrapper from '../components/OverlayWrapper'
import { useAuth } from '../hooks/useAuth'
// import { useLogin } from '../hooks/useLogin'
import axiosInstance from '../api/axios'

type Inputs = {
	username: string
	password: string
}

export default function Login() {
	const [showPswd, setShowPswd] = useState(false)
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)
	const { dispatch } = useAuth()
	const navigate = useNavigate()
	// const { mutate, data: userInfo, isPending, error } = useLogin()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setError(null)
		try {
			// await mutate(data)
			setIsPending(true)
			const res = await axiosInstance.post('login', data)
			const userInfo = res.data

			dispatch({ type: 'LOGIN', token: userInfo.token, user: userInfo.admin })
			Cookies.set('token', userInfo.token, { expires: 1 })
			// console.log('user: ', userInfo)
			navigate('/')
			// naive fix for preflight authentication
			window.location.reload()

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setIsPending(false)
		}
	}

	return (
		<OverlayWrapper>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full h-auto bg-white dark:bg-black dark:text-white p-6 rounded-lg my-auto pt-20"
			>
				<h2 className="text-3xl font-semibold text-center text-primary ">
					Login
				</h2>
				<p className="text-center mb-6">Login to your admin account</p>

				{/* Username */}
				<div className="mb-4">
					<label
						className="text-lg text-grey/50 dark:text-light-grey mb-2 block"
						htmlFor="username"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						{...register('username', { required: true })}
						className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary
              ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
					/>
					{errors.username && (
						<p className="text-red-500 text-sm mt-1">
							A valid username is required
						</p>
					)}
				</div>

				{/* Password */}
				<label className="block w-full mb-4">
					<span className="text-lg text-grey/50 dark:text-light-grey">
						Password
					</span>
					<div
						className={`flex mt-3 gap-3 rounded-md relative border-grey/30 border bg-transparent transition-all duration-200`}
					>
						<input
							type={showPswd ? 'text' : 'password'}
							{...register('password', { required: true, minLength: 6 })}
							placeholder="Create password"
							className="h-10 rounded-md inline-block outline-0 w-full border-0 bg-transparent px-4"
						/>
						<div
							className="flex w-10 items-center justify-center text-2xl text-grey/50 dark:text-light-grey"
							onClick={() => setShowPswd((pswd) => !pswd)}
						>
							{showPswd ? <PiEyeThin /> : <PiEyeSlashThin />}
						</div>
					</div>
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">
							A valid password is required
						</p>
					)}
				</label>
				{error && (
					<p className="text-red-500 pb-2" role="alert">
						Invalid login credentials
					</p>
				)}

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-primary text-white py-2 mt-6 rounded font-medium hover:bg-green-700 transition disabled:opacity-40 cursor-pointer"
				>
					Login
				</button>
			</form>
		</OverlayWrapper>
	)
}
