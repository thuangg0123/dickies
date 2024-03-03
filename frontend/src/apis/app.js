import axios from '../axios.js'

export const apiGetCategories = () => axios({
    url: '/category',
    method: 'get'
})