import Cookies from 'js-cookie'
import { useState } from 'react'
import axiosInstance, { setAuthToken } from '../api/axios'
import OverlayWrapper from '../components/OverlayWrapper'
import { useAuth } from '../hooks/useAuth'

interface FormErrors {
	username?: string
	password?: string
}

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<FormErrors>({})
	const { dispatch } = useAuth()

	const validate = (): boolean => {
		const newErrors: FormErrors = {}

		if (!username.trim()) {
			newErrors.username = 'Username is required'
		}

		if (!password) {
			newErrors.password = 'Password is required'
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validate()) return

		// Replace with real login logic
		console.log('Logging in with:', { username, password })
		try {
			const res = await axiosInstance.post('/login', {
				username,
				password,
			})
			const token: string = res.data.token
			console.log('data: ', res.data.token)
			setAuthToken(token)
			dispatch({ type: 'LOGIN', token, user: null })
			Cookies.set('token', token, { expires: 7 })
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('login error: ', error)
		}
	}

	return (
		<OverlayWrapper>
			<form
				onSubmit={handleSubmit}
				className="w-full h-auto bg-white p-6 rounded-lg my-auto pt-20"
			>
				<h2 className="text-2xl font-semibold text-center text-primary mb-6">
					Login
				</h2>

				{/* Username */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary
              ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
					/>
					{errors.username && (
						<p className="text-red-500 text-sm mt-1">{errors.username}</p>
					)}
				</div>

				{/* Password */}
				<div className="mb-6">
					<label className="block text-sm font-medium mb-1">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">{errors.password}</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-green-700 transition"
				>
					Login
				</button>
			</form>
		</OverlayWrapper>
	)
}
