import { useEffect } from 'react'
// ref: React.RefObject<HTMLElement>,

export function useClickOutside(
	ref: React.RefObject<HTMLElement | null>,
	handler: () => void
) {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) return
			handler()
		}

		document.addEventListener('mousedown', listener)
		return () => document.removeEventListener('mousedown', listener)
	}, [ref, handler])
}
