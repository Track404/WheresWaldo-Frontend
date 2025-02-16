import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://whereswaldo-backend-production.up.railway.app/', // Use env variable for flexibility
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
