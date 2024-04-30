const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createNewOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { products, total, address, status } = req.body
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] })
    }
    const data = { products, total, orderBy: _id }
    if (status) {
        data.status = status
    }
    const response = await Order.create(data)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create new order'
    })
})

const getDetailOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const response = await Order.findById(orderId)
        .populate("orderBy", "address email firstName lastName phone")
        .populate("products.product", "title")
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get detail order'
    })
})

const updateStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const { status } = req.body
    if (!status) {
        throw new Error("missing status")
    }
    const response = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        message: response ? "Update order status is success" : "Update order status is failed"
    })
})

const getUserOrders = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    const { _id } = req.user
    const excludeField = ['limit', 'sort', 'page', 'fields']
    excludeField.forEach(element => delete queries[element])
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedElement => `$${matchedElement}`)
    const formattedQueries = JSON.parse(queryString)
    const qr = { ...formattedQueries, orderBy: _id }

    let queryCommand = Order.find(qr).populate('products.product', 'title')

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT
    const skip = (page - 1) * limit

    queryCommand.skip(skip).limit(limit)
    queryCommand.then(async (response) => {
        const counts = await Order.find(qr).countDocuments()
        return res.status(200).json({
            counts: counts,
            success: counts > 0 ? true : false,
            orders: counts > 0 ? response : 'cannot get orders',
        })
    }).catch((err) => {
        console.log("Error: ", err)
    });
})

const getOrders = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    // tách các trường đặc biệt ra khỏi query
    const excludeField = ['limit', 'sort', 'page', 'fields']
    excludeField.forEach(element => delete queries[element])
    // format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedElement => `$${matchedElement}`)
    const formattedQueries = JSON.parse(queryString)
    //filtering
    if (queries?._id) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' }
    }
    if (queries?.orderBy) {
        formattedQueries.category = { $regex: queries.category, $options: 'i' }
    }

    let queryObject = {}
    if (queries?.q) {
        delete formattedQueries.q;
        queryObject = {
            $or: [
                { _id: { $regex: queries.q, $options: 'i' } },
                { "orderBy.firstName": { $regex: queries.q, $options: 'i' } },
                { "orderBy.lastName": { $regex: queries.q, $options: 'i' } },
            ]
        };
    }

    const qr = { ...formattedQueries }

    let queryCommand = Order.find(qr).populate('products.product', 'title').populate("orderBy", "firstName lastName")
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
        const counts = await Order.find(qr).countDocuments()
        return res.status(200).json({
            counts: counts,
            success: counts > 0 ? true : false,
            orders: counts > 0 ? response : 'cannot get orders',
        })
    }).catch((err) => {
        console.log("Error: ", err)
    });
})

module.exports = {
    createNewOrder, updateStatus, getUserOrders, getOrders, getDetailOrder
}