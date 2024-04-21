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