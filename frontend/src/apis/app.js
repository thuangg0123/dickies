import axios from '../axios.js'

export const apiGetCategories = () => axios({
    url: '/category',
    method: 'get'
})

export const apiGetProductByCategory = (category, limit = 6) => axios({
    url: `/product?category=${category}&limit=${limit}`,
    method: 'get'
})