const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createNewOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { products, total, address } = req.body
    if (address) {
        await User.findByIdAndUpdate(_id, { address })
    }
    const response = await Order.create({ products, total, postedBy: _id })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create new order'
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
        data: response ? response : 'cannot create new order'
    })
})

const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({ orderBy: _id })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create new order'
    })
})

const getAllOrders = asyncHandler(async (req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create new order'
    })
})

module.exports = {
    createNewOrder, updateStatus, getUserOrder, getAllOrders
}