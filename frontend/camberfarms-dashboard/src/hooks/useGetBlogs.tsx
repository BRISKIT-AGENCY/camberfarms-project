import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../api/axios'
import type { Blog } from '../types/blog'

export default function useGetBlogs() {
	return useQuery({
		queryKey: ['blog'],
		queryFn: async () => {
			const [africaPost, exportPost] = await Promise.all([
				axiosInstance.get('africa-blogs'),
				axiosInstance.get('export-blogs'),
			])
			const africaBlog = africaPost.data as {
				total: number
				success: boolean
				blogs: Blog[]
			}

			const exportBlog = exportPost.data as {
				total: number
				success: boolean
				exportBlogs: Blog[]
			}

			return { africa: africaBlog, export: exportBlog }
		},
	})
}
