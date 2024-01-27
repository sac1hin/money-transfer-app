import axios from 'axios';
import Cookies from 'js-cookie'

// Create Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
    const authCookie = Cookies.get('_auth');
    if (authCookie) {
        config.headers.Authorization = `Bearer ${authCookie}`;
    }
    return config;
});

// user 
export const login = async (payload) => {
    const response = await axiosInstance.post('/user/login', payload);
    return response.data;
}

export const signUp = async (payload) => {
    const response = await axiosInstance.post('/user/sign-up', payload);
    return response.data;
}

export const profile = async () => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
}

export const filterUser = async (name) => {
    console.log("sssss", name)
    const response = await axiosInstance.get(`/user/bulk?filter=${name}`);
    return response.data;
}

// http://localhost:8000/api/v1/user/profile
// http://localhost:8000/api/v1/user/bulk?filter=verma

// account

export const handleBalance = async () => {
    const response = await axiosInstance.get('/account/balance');
    return response.data;
}

export const initiateTransfer = async (payload) => {
    const response = await axiosInstance.post('/account/transfer', payload);
    return response.data;
}


// http://localhost:8000/api/v1/account/balance
// http://localhost:8000/api/v1/account/transfer