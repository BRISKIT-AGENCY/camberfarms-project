import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://api.camberfarms.org',
	// timeout: 1000,
})

export default axiosInstance
