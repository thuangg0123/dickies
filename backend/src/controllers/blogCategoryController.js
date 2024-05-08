const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createBlogCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create blog category'
    })
})

const getAllBlogCategories = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get all blog categories'
    })
})

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { blogCategoryId } = req.params
    const response = await BlogCategory.findByIdAndUpdate(blogCategoryId, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot update blog category'
    })
})

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { blogCategoryId } = req.params
    const response = await BlogCategory.findByIdAndDelete(blogCategoryId)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? 'delete success' : 'cannot delete blog category'
    })
})

module.exports = {
    createBlogCategory,
    getAllBlogCategories,
    updateBlogCategory,
    deleteBlogCategory
}