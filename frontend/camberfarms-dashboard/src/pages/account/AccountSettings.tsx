import { useState } from 'react'
import { GoKey } from 'react-icons/go'
import { IoMoonOutline } from 'react-icons/io5'
import {
	MdInfoOutline,
	MdKeyboardArrowRight,
	MdOutlineToggleOn,
} from 'react-icons/md'
import { TbLock } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { useRequestOTPUser } from '../../hooks/useRequestOTPUser'

export default function AccountSettings() {
	const [showInfo, setShowInfo] = useState(false)
	const navigate = useNavigate()
	const onSuccess = () => navigate('/account/user/verification')
	const { mutate, isPending } = useRequestOTPUser(onSuccess)

	return (
		<div role="navigation" className="w-full py-4">
			<Link
				to={'theme'}
				className="flex w-full items-center gap-4 px-2 py-4 border-b text-black dark:text-white border-grey/30"
			>
				<IoMoonOutline size={20} className="text-primary" />
				<span>Theme</span>
				<MdKeyboardArrowRight
					size={20}
					className="inline-flex ml-auto text-grey/30"
				/>
			</Link>
			<button
				type="button"
				onClick={() => mutate()}
				disabled={isPending}
				className="flex w-full items-center gap-4 px-2 py-4 border-b text-black dark:text-white border-grey/30 disabled:opacity-50"
			>
				<GoKey size={20} className="text-primary" />
				<span>Reset Password</span>
				<MdKeyboardArrowRight
					size={20}
					className="inline-flex ml-auto text-grey/30"
				/>
			</button>
			<button
				// onClick={() => setEnable2FA((prev) => !prev)}
				// to={'2factor'}
				className="flex w-full items-center gap-4 px-2 py-4 border-b text-black dark:text-white border-grey/30 opacity-50"
			>
				<TbLock size={20} className="text-primary" />
				<span>Enable 2 Factor Authentication for other devices</span>
				<div className="w-fit -ml-2 relative flex items-center">
					<MdInfoOutline
						onClick={() => setShowInfo((prev) => !prev)}
						className="text-blue-400 text-lg cursor-pointer"
					/>
					{showInfo && (
						<p className="absolute -top-5 left-2 w-40 lg:w-80 lg:-top-2 text-black dark:text-white text-sm opacity-100">
							To protect your account, this has been disabled.
						</p>
					)}
				</div>

				<MdOutlineToggleOn
					size={30}
					className={`inline-flex ml-auto text-primary transition-all duration-200 ease-in-out transition-discrete`}
				/>
			</button>
		</div>
	)
}
