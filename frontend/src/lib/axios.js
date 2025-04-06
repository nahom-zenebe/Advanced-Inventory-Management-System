import axios from 'axios';

const fallbackURL = "https://advanced-inventory-management-system-v1.onrender.com";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL|| fallbackURL}/api`,
    withCredentials: true,
  });
  
export default axiosInstance