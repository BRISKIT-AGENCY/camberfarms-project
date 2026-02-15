import logo from '../assets/icon/logo.png'

export default function LoadingSpinner() {
	return (
		<aside className="w-full h-dvh flex items-center justify-center bg-white/40 dark:bg-black/40 fixed inset-0 z-40 animate-pulse">
			<div className="w-40 aspect-square">
				<img src={logo} alt="camberfarms" className="w-full object-contain" />
			</div>
		</aside>
	)
}
