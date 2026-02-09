import { useQueryClient } from '@tanstack/react-query'

export function useRefetchQueries(queryKey: string) {
	const queryClient = useQueryClient()

	return () => {
		queryClient.invalidateQueries({
			queryKey: [queryKey],
			// refetchType: 'all',
		})
	}
}
