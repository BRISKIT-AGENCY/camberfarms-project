import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
	baseURL: 'https://api.camberfarms.org/api/admin',
})

const token = Cookies.get('token')

// export const setAuthToken = (token: string | null) => {
if (token) {
	axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
} else {
	delete axiosInstance.defaults.headers['Authorization']
}
// }

export default axiosInstance
