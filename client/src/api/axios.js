import axios from 'axios';

const API = axios.create({
    baseURL: 'https://lms-portal-z271.onrender.com/api' 
});

export default API;
