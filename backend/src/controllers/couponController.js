const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createNewCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body
    if (!name || !discount || !expiry) {
        throw new Error("missing inputs")
    }
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create new coupon'
    })
})

const getAllCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt -__v')
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get all coupons'
    })
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error("missing inputs")
    }
    if (req.body.expiry) {
        req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 1000
    }
    const response = await Coupon.findByIdAndUpdate(couponId, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot update coupon'
    })
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    const response = await Coupon.findByIdAndDelete(couponId)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? 'delete success' : 'cannot delete coupon'
    })
})

const getCoupon = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    const response = await Coupon.findById(couponId)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get coupon'
    })
})

module.exports = {
    createNewCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
    getCoupon
}