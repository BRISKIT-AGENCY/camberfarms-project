import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL


export const trackVisit = async (path: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/api/admin/track-visit`, {
      path
    })
  } catch (err) {
    console.error('Failed to track visit', err)
  }
}
