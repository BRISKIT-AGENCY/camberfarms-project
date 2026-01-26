import { createPortal } from 'react-dom'

type OverlayProps = {
	children: React.ReactNode
	fullWidth?: boolean
	// title: string
	// onClose: () => void
}

export default function OverlayWrapper({
	children,
	fullWidth = true,
}: OverlayProps) {
	return createPortal(
		<section
			className="w-full p-10 h-dvh flex items-center justify-center bg-grey/60 fixed z-30 inset-0 dark:bg-black/60"
			role="dialog"
			aria-labelledby="page-title"
		>
			<div
				className={`max-w-xl xl:max-w-3xl bg-white text-black dark:bg-black dark:text-white rounded-lg p-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${fullWidth ? 'w-full h-full' : 'w-fit h-auto'}`}
			>
				{children}
			</div>
		</section>,
		document.getElementById('root')!,
	)
}
