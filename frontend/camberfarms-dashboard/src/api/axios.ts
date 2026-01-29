import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://camberfarms-project.onrender.com/api/admin',
})

export const setAuthToken = (token: string | null) => {
	if (token) {
		axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
	} else {
		delete axiosInstance.defaults.headers['Authorization']
	}
}

export default axiosInstance
