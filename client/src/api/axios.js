import axios from 'axios';

const API = axios.create({
    baseURL: 'https://lms-portal-z271.onrender.com/api'
});

// Add this interceptor to attach the token to every request
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile'); // Or whatever key you use to store user data
    if (profile) {
        const token = JSON.parse(profile).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
