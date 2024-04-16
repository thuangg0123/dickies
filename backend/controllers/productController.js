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
        success: newProduct ? true : false,
        dataProduct: newProduct ? newProduct : 'cannot create a product'
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) {
        throw new Error("not found product")
    }
    const product = await Product.findById(productId).populate({
        path: "ratings",
        populate: {
            path: "postedBy",
            select: "firstName lastName avatar"
        }
    })
    return res.status(200).json({
        success: product ? true : false,
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
    let formattedQueries = JSON.parse(queryString)
    let genderQueryObj = {}
    //filtering
    if (queries?.title) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' }
    }
    if (queries?.category) {
        formattedQueries.category = { $regex: queries.category, $options: 'i' } // Sử dụng giá trị từ query parameters
    }
    if (queries?.gender) {
        delete formattedQueries.gender
        const genderArray = queries.gender?.split(',')
        const genderQuery = genderArray.map(element => ({ gender: { $regex: element, $options: 'i' } }))
        genderQueryObj = { $or: genderQuery }
    }
    const q = { ...genderQueryObj, ...formattedQueries }

    let queryCommand = Product.find(q)
    //excute query

    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    //fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    //pagination
    // limit, page (skip)
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT
    const skip = (page - 1) * limit

    queryCommand.skip(skip).limit(limit)
    queryCommand.then(async (response) => {
        const counts = await Product.find(q).countDocuments()
        return res.status(200).json({
            counts: counts,
            success: counts > 0 ? true : false,
            dataProduct: counts > 0 ? response : 'cannot get products',
            errorCode: counts > 0 ? 1 : 0,
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
        success: updatedProduct ? true : false,
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
        success: deleteProduct ? true : false,
        dataProduct: deleteProduct ? `${deleteProduct.title} is deleted successful` : 'cannot delete product',
        errorCode: deleteProduct ? 1 : 0
    })
})

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, productId, updatedAt } = req.body
    if (!star || !productId) {
        throw new Error("Missing inputs")
    }
    const ratingProduct = await Product.findById(productId)
    //postedBy đang là objId nên phải convert sang string mới match với _id
    const isExistRating = ratingProduct?.ratings?.find(element => element.postedBy.toString() === _id)
    if (isExistRating) {
        //update star && comment
        await Product.updateOne({
            ratings: { $elemMatch: isExistRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": updatedAt }
        }, { new: true })
    }
    else {
        // add star && comment
        await Product.findByIdAndUpdate(productId, {
            $push: {
                ratings: { star, comment, postedBy: _id, updatedAt }
            }
        }, { new: true })
    }

    //total ratings
    const updateProduct = await Product.findById(productId)
    const ratingCount = updateProduct.ratings.length
    const totalRatings = updateProduct.ratings.reduce((total, element) => {
        return total + element.star
    }, 0)
    updateProduct.totalRatings = Math.round(totalRatings * 10 / ratingCount) / 10

    await updateProduct.save()
    return res.status(200).json({
        success: true,
        data: updateProduct
    })
})

const uploadImageProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!req.files) {
        throw new Error("missing inputs")
    }
    const response = await Product.findByIdAndUpdate(productId, { $push: { images: { $each: req.files.map(element => element.path) } } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot upload images'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct
}