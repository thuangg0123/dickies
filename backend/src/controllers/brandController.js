const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create new brand'
    })
})

const getAllBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get all brand'
    })
})

const updateBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params
    const response = await Brand.findByIdAndUpdate(brandId, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot update brand'
    })
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params
    const response = await Brand.findByIdAndDelete(brandId)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? 'delete success' : 'cannot delete brand'
    })
})

const getBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params
    const response = await Brand.findById(brandId)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get brand'
    })
})

module.exports = {
    createBrand,
    getAllBrands,
    updateBrand,
    deleteBrand,
    getBrand
}