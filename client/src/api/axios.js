import axios from 'axios';

// This logic replaces the need for a .env file
const API = axios.create({
    baseURL: import.meta.env.MODE === 'production' 
        ? '/api'                // In production, use the same domain
        : 'http://localhost:5000/api', // In development, use your local server
});

// The rest of your interceptors stay exactly the same
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return req;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;