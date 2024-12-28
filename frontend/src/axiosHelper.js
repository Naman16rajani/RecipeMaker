// axiosHelper.js
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Set your base URL

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Set your base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to update Authorization header
export const setAuthorizationToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Function to handle GET requests
export const getRequest = async (url, params = {}) => {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthorizationToken(token); // Add Bearer token to the headers
        }
        const response = await axiosInstance.get(baseURL + url, {params});
        return response.data;
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
};

// Function to handle POST requests
export const postRequest = async (url, data = {}) => {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthorizationToken(token); // Add Bearer token to the headers
        }
        const response = await axiosInstance.post(baseURL + url, JSON.stringify(data));
        return response.data;
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
};

export default axiosInstance;
