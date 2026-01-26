// import { FiToggleRight } from 'react-icons/fi'
import { useState } from 'react'
import { GoKey } from 'react-icons/go'
import { IoMoonOutline } from 'react-icons/io5'
import {
	MdKeyboardArrowRight,
	MdOutlineToggleOff,
	MdOutlineToggleOn,
} from 'react-icons/md'
import { TbLock } from 'react-icons/tb'
import { Link } from 'react-router-dom'

export default function AccountSettings() {
	const [enable2FA, setEnable2FA] = useState(true)
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
			<Link
				to={'iforgot'}
				className="flex w-full items-center gap-4 px-2 py-4 border-b text-black dark:text-white border-grey/30"
			>
				<GoKey size={20} className="text-primary" />
				<span>Forgot Password</span>
				<MdKeyboardArrowRight
					size={20}
					className="inline-flex ml-auto text-grey/30"
				/>
			</Link>
			<button
				onClick={() => setEnable2FA((prev) => !prev)}
				// to={'2factor'}
				className="flex w-full items-center gap-4 px-2 py-4 border-b text-black dark:text-white border-grey/30 cursor-pointer"
			>
				<TbLock size={20} className="text-primary" />
				<span>Enable 2 Factor Authentication for other devices</span>
				{enable2FA && (
					<MdOutlineToggleOn
						size={30}
						className={`inline-flex ml-auto text-primary transition-all duration-200 ease-in-out transition-discrete`}
					/>
				)}
				{!enable2FA && (
					<MdOutlineToggleOff
						size={30}
						className={`inline-flex ml-auto text-primary transition-all duration-200 ease-in-out transition-discrete`}
					/>
				)}
			</button>
		</div>
	)
}
