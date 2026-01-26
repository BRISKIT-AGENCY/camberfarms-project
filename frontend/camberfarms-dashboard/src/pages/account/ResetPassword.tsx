import { useState } from 'react'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import closeIcon from '../../assets/icon/close.svg'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'

export default function ResetPassword() {
	const goBack = useGoBack('account')
	const [showPswd, setShowPswd] = useState(false)

	return (
		<OverlayWrapper fullWidth={false}>
			<div className="w-md pb-4 px-2 flex flex-col gap-2 bg-white text-black dark:bg-black dark:text-white relative">
				<img
					src={closeIcon}
					className="w-10 aspect-square absolute top-0 right-0 cursor-pointer"
					alt="close"
					onClick={goBack}
				/>
				<h6 className="text-2xl font-bold font-poppins">Create new password</h6>
				<p className="text-sm text-grey dark:text-light-grey mb-8">
					Enter your new password below to change login password.
				</p>
				{/* pass */}

				<label className="block w-full mb-4">
					<span className="text-lg text-grey/50 dark:text-light-grey">
						New password
					</span>
					<div
						className={`flex mt-3 gap-3 rounded-md relative border-grey/30 border bg-transparent transition-all duration-200`}
					>
						<input
							type={showPswd ? 'text' : 'password'}
							// disabled={isPending || isSuccess}
							name="password"
							// value={formData.password}
							// onChange={handleChange}
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
				</label>
				{/* pass 2 */}
				<label className="block w-full mb-6">
					<span className="text-lg text-grey/50 dark:text-light-grey">
						Confirm password
					</span>
					<div
						className={`flex mt-3 gap-3 rounded-md relative border-grey/30 border bg-transparent transition-all duration-200`}
					>
						<input
							type={showPswd ? 'text' : 'password'}
							// disabled={isPending || isSuccess}
							name="password"
							// value={formData.password}
							// onChange={handleChange}
							placeholder="Enter password again"
							className="h-10 rounded-md inline-block outline-0 w-full border-0 bg-transparent px-4"
						/>
					</div>
				</label>

				<Link
					to={'/account/reset-success'}
					// disabled={disableSubmit}
					className="w-full text-center bg-primary text-white py-2 px-6 font-medium font-poppins text-lg cursor-pointer rounded-lg disabled:opacity-30"
				>
					Confirm password
				</Link>
			</div>
		</OverlayWrapper>
	)
}
