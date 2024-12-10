import axios from 'axios';

const AxiosService = axios.create({
  baseURL: 'http://localhost:8888/api', // Update to match your API port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosService;