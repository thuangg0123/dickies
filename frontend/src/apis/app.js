import axios from '../axios.js'

export const apiGetCategories = () => axios({
    url: '/category',
    method: 'get'
})

export const apiGetProductByCategory = (category, limit = 6) => axios({
    url: `/product?category=${category}&limit=${limit}`,
    method: 'get'
})

export const apiGetProductByGender = (gender) => axios({
    url: `/product?gender=${gender}`,
    method: 'get'
})

export const apiGetDetailProduct = (productId) => axios({
    url: `/product/${productId}`,
    method: 'get'
})