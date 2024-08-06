import axios from 'axios';
import Cookies from 'js-cookie';

const backend = "http://localhost:8080";

axios.defaults.baseURL = backend;

axios.interceptors.request.use(
    config => {
        const token = Cookies.get('jwt');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;