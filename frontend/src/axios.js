import axios from 'axios'
import Header from './components/Header';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const localStorageData = window.localStorage.getItem("persist:root");
    if (localStorageData) {
        const rootData = JSON.parse(localStorageData);
        const userData = JSON.parse(rootData.user);
        if (userData && typeof userData.token === 'string') {
            const accessToken = userData.token;
            config.headers = {
                Authorization: `Bearer ${accessToken}`
            };
        }
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});




// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
});

export default instance