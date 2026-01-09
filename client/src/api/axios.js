import axios from 'axios';

const API = axios.create({
    baseURL: 'https://lms-portal-z271.onrender.com/api',
    withCredentials: true // Fixed: changed 'True' to 'true' and added 'with'
});

API.interceptors.request.use((req) => {
    // Check if your Login.js uses 'user' or 'profile'
    const storedData = localStorage.getItem('user'); 
    if (storedData) {
        try {
            const token = JSON.parse(storedData).token;
            // This MUST match the Bearer split in your middleware
            req.headers.Authorization = `Bearer ${token}`; 
        } catch (error) {
            console.error("Error parsing token from localStorage", error);
        }
    }
    return req;
});

export default API;
