import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
	baseURL: 'https://camberfarms-project.onrender.com/api/admin',
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
