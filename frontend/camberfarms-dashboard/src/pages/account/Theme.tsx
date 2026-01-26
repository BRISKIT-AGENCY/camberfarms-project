import closeIcon from '../../assets/icon/close.svg'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useTheme } from '../../context/ThemeContext'
import { useGoBack } from '../../hooks/useGoBack'

export default function Theme() {
	const goBack = useGoBack('account')
	const { setTheme, theme } = useTheme()

	return (
		<OverlayWrapper fullWidth={false}>
			<div className="w-md pb-4 flex flex-col gap-2 bg-white text-black dark:bg-black dark:text-white relative">
				<img
					src={closeIcon}
					className="w-10 aspect-square absolute top-0 right-0 cursor-pointer"
					alt="close"
					onClick={goBack}
				/>
				<h6 className="text-xl font-bold font-poppins">Theme</h6>
				<p className="text-sm text-grey">Choose your account theme.</p>
				{/* light */}
				<label className="w-full flex items-center justify-between p-2 mt-2 border-b border-grey/40 group">
					<input
						type="radio"
						name="theme"
						checked={theme === 'light'}
						onChange={() => setTheme('light')}
						id="light-mode"
						className="hidden"
					/>
					<span>Light mode</span>
					<div className="w-6 aspect-square rounded-full border ml-auto flex items-center justify-center group-has-checked:border-primary relative after:w-4 after:aspect-square after:rounded-full group-has-checked:after:bg-primary"></div>
				</label>
				{/* dark */}
				<label className="w-full flex items-center justify-between p-2 mt-2 border-b border-grey/40 group">
					<input
						type="radio"
						name="theme"
						id="dark-mode"
						className="hidden"
						checked={theme === 'dark'}
						onChange={() => setTheme('dark')}
					/>
					<span>Dark mode</span>
					<div className="w-6 aspect-square rounded-full border ml-auto flex items-center justify-center group-has-checked:border-primary relative after:w-4 after:aspect-square after:rounded-full group-has-checked:after:bg-primary"></div>
				</label>
				{/* system */}
				<label className="w-full flex items-center justify-between p-2 mt-2 border-b border-grey/40 group">
					<input
						type="radio"
						name="theme"
						id="system"
						className="hidden"
						checked={theme === 'system'}
						onChange={() => setTheme('system')}
					/>
					<span>System default</span>
					<div className="w-6 aspect-square rounded-full border ml-auto flex items-center justify-center group-has-checked:border-primary relative after:w-4 after:aspect-square after:rounded-full group-has-checked:after:bg-primary"></div>
				</label>
			</div>
		</OverlayWrapper>
	)
}
