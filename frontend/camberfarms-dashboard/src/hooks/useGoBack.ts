import { useLocation, useNavigate } from 'react-router-dom'

export function useGoBack(url: string) {
	const navigate = useNavigate()
	const location = useLocation()

	// check if the current page is first in the history stack
	return () => {
		if (location.key === 'default') {
			navigate(url, { replace: true })
		} else {
			navigate(-1)
		}
	}
}
