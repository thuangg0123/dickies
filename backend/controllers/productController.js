const { query } = require('express')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
var slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error("Missing inputs")
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        susccess: newProduct ? true : false,
        dataProduct: newProduct ? newProduct : 'cannot create a product'
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) {
        throw new Error("not found product")
    }
    const product = await Product.findById(productId)
    return res.status(200).json({
        susccess: product ? true : false,
        dataProduct: product ? product : 'cannot get product'
    })
})

const getAllProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    // tách các trường đặc biệt ra khỏi query
    const excludeField = ['limit', 'sort', 'page', 'fields']
    excludeField.forEach(element => delete queries[element])
    // format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedElement => `$${matchedElement}`)
    const formattedQueries = JSON.parse(queryString)
    //filtering
    if (queries.title) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' }
    }
    let queryCommand = Product.find(formattedQueries)
    //excute query

    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    queryCommand.then(async (response) => {
        const counts = await Product.find(formattedQueries).countDocuments()
        return res.status(200).json({
            susccess: counts > 0 ? true : false,
            dataProduct: counts > 0 ? response : 'cannot get products',
            errorCode: counts > 0 ? 1 : 0,
            counts: counts
        })
    }).catch((err) => {
        console.log("Error: ", err)
    });
})

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) {
        throw new Error("not found product")
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
    return res.status(200).json({
        susccess: updatedProduct ? true : false,
        dataProduct: updatedProduct ? updatedProduct : 'cannot update product',
        errorCode: updatedProduct ? 1 : 0
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) {
        throw new Error("not found product")
    }
    const deleteProduct = await Product.findByIdAndDelete(productId)
    return res.status(200).json({
        susccess: deleteProduct ? true : false,
        dataProduct: deleteProduct ? `${deleteProduct.title} is deleted successful` : 'cannot delete product',
        errorCode: deleteProduct ? 1 : 0
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}