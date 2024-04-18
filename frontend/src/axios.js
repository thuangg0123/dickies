import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
});

instance.interceptors.request.use(function (config) {
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
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response.data;
});

export default instance