import axios from '../axios.js'

export const apiGetCategories = () => axios({
    url: '/category',
    method: 'get'
})

export const apiGetProductByCategory = (category, limit = 6) => axios({
    url: `/product?category=${category}&limit=${limit}`,
    method: 'get'
})

export const apiGetDetailProduct = (productId) => axios({
    url: `/product/` + productId,
    method: 'get'
})

export const apiGetProductByQuery = (params) => axios({
    url: `/product/`,
    method: 'get',
    params,
})

export const apiRatings = (data) => axios({
    url: `/product/ratings`,
    method: 'put',
    data,
})

export const apiCreateProduct = (data) => axios({
    url: `/product/`,
    method: 'post',
    data,
})

export const apiUpdateProduct = (data, productId) => axios({
    url: `/product/` + productId,
    method: 'put',
    data,
})

export const apiDeleteProduct = (productId) => axios({
    url: `/product/` + productId,
    method: 'delete',
})

export const apiAddVariant = (data, productId) => axios({
    url: `/product/variant/` + productId,
    method: 'put',
    data
})

export const apiCreateOrder = (data) => axios({
    url: `/order/`,
    method: 'post',
    data
})

export const apiGetOrders = (params) => axios({
    url: `/order/`,
    method: 'get',
    params
})

export const apiAllOrdersByAdmin = (params) => axios({
    url: `/order/admin/`,
    method: 'get',
    params
})

export const apiGetUserOrders = (params) => axios({
    url: `/order/`,
    method: 'get',
    params
})

export const apiUpdateStatusOrder = (orderId, status) => axios({
    url: `/order/update-status/${orderId}/`,
    method: 'put',
    data: { status }
})

export const apiGetDetailOrder = (orderId) => axios({
    url: `/order/${orderId}`,
    method: 'get',
})
