import { createPortal } from 'react-dom'

type OverlayProps = {
	children: React.ReactNode
	// title: string
	// onClose: () => void
}

export default function OverlayWrapper({ children }: OverlayProps) {
	return createPortal(
		<section
			className="w-full p-10 h-dvh flex items-center justify-center bg-grey/60 fixed z-30 inset-0"
			role="dialog"
			aria-labelledby="page-title"
		>
			<div className="w-full h-full max-w-xl xl:max-w-3xl bg-white rounded-lg p-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
				{children}
			</div>
		</section>,
		document.getElementById('root')!,
	)
}
