const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')
var slugify = require('slugify')

const createCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create category'
    })
})

const getAllCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get all categories'
    })
})

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params
    const response = await ProductCategory.findByIdAndUpdate(categoryId, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot update category'
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params
    const response = await ProductCategory.findByIdAndDelete(categoryId)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? 'delete success' : 'cannot delete category'
    })
})

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}