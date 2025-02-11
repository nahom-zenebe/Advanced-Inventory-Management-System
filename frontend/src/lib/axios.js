import axios from 'axios';



const axiosInstance=axios.create({
    baseURL:"http://localhost:3002/api",
    withCredentials: true, 
})

export default axiosInstance