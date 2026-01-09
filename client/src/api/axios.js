import axios from 'axios';

const API = axios.create({
    // REMOVE the trailing slash if your routes start with /
    baseURL: 'https://lms-portal-z271.onrender.com/api', 
    withCredentials: true 
});

API.interceptors.request.use((req) => {
    const storedData = localStorage.getItem('user'); 
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            // Ensure you are accessing the token correctly from your object
            const token = parsedData.token || parsedData.data?.token; 
            if (token) {
                req.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Token error:", error);
        }
    }
    return req;
});

export default API;
