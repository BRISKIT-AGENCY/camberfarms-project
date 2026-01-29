import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://camberfarms-project.onrender.com',
	// timeout: 1000,
})

export default axiosInstance
