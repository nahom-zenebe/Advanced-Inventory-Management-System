import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
    withCredentials: true,
  });
  
export default axiosInstance