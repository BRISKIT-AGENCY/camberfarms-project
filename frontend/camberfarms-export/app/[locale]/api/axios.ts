import axios from 'axios'

export const baseURL = 'http://localhost:5000/api'

const axiosInstance = axios.create({
	baseURL,
	// timeout: 3000,
})

export default axiosInstance
