// api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Use env variable for flexibility
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
