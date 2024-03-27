import axios from '../axios.js'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
    withCredentials: true
})

export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const apiForgotPassword = (data) => axios({
    url: '/user/forgot-password',
    method: 'post',
    data
})

export const apiResetPassword = (data) => axios({
    url: '/user/reset-password',
    method: 'put',
    data
})