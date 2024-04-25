import axios from '../axios.js'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
    withCredentials: true
})

export const apiFinalRegister = (token) => axios({
    url: '/user/final-register/' + token,
    method: 'put',
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

export const apiGetCurrent = () => axios({
    url: '/user/current',
    method: 'get',
})

export const apiGetUsers = (params) => axios({
    url: '/user/',
    method: 'get',
    params
})

export const apiUpdateUsers = (data, userId) => axios({
    url: '/user/update-user-by-admin/' + userId,
    method: 'put',
    data
})

export const apiDeleteUser = (userId) => axios({
    url: '/user/' + userId,
    method: 'delete',
})

export const apiUpdateCurrent = (data) => axios({
    url: '/user/current',
    method: 'put',
    data
})

export const apiUpdateCart = (data) => axios({
    url: '/user/cart',
    method: 'put',
    data
})

export const apiRemoveCart = (productId) => axios({
    url: '/user/remove-cart/' + productId,
    method: 'delete',
})