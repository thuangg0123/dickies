const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken, } = require('../middleware/jwt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../ultils/sendMail')
var crypto = require("crypto")
const makeToken = require('uniqid')
const { users } = require('../ultils/constant')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body

    if (!email || !password || !firstName || !lastName || !phone) {
        return res.status(500).json({
            success: false,
            message: "Missing inputs",
            errorCode: -1
        })
    }
    const user = await User.findOne({
        email: email
    })

    if (user) {
        throw new Error("User has existed !")
    }
    else {
        const token = makeToken()
        const emailEdited = btoa(email) + '@' + token
        const newUser = await User.create({
            email: emailEdited, password, firstName, lastName, phone
        })
        if (newUser) {
            const html = `<h2>Register code </h2> <br /><blockquote>${token}</blockquote>`
            await sendMail({ email, html, subject: "Confirm register account in E-MERN !!!" })
        }
        setTimeout(async () => {
            await User.deleteOne({ email: emailEdited })
        }, [300000]);

        return res.json({
            success: newUser ? true : false,
            message: newUser ? "Please check your email to active account" : "Something wrong, please try again"
        })
    }
})

const finalRegister = asyncHandler(async (req, res) => {
    const { token } = req.params
    const notActivedEmail = await User.findOne({ email: new RegExp(`${token}$`) })
    if (notActivedEmail) {
        notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0])
        notActivedEmail.save()
    }
    return res.json({
        success: notActivedEmail ? true : false,
        data: notActivedEmail ? 'Register is successfully, please go to login' : "Something wrong, please try again"
    })
})

// refreshToken dùng để cấp mới lại token
// accessToken dùng để xác thực người dùng, phân quyền user

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({
            success: false,
            message: "Missing inputs",
            errorCode: -1
        })
    }

    const response = await User.findOne({
        email: email
    })
    if (response && await response.isCorrectPassword(password)) {
        // tách password và role ra khỏi response
        const { password, role, refreshToken, ...userData } = response.toObject()
        // tạo access token
        const accessToken = generateAccessToken(response._id, role)
        // tạo refresh token
        const newRefreshToken = generateRefreshToken(response._id, role)
        // lưu refresh token vào database 
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        // lưu refresh token vào cookie
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            message: "Login successfully !",
            accessToken: accessToken,
            userData: userData,
            errorCode: 0
        })
    }
    else {
        throw new Error("Invalid credentials")
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id)
        .select('-refreshToken -password')
        .populate({
            path: "cart",
            populate: {
                path: "product",
                select: 'title thumb color price sizes'
            }
        })
        .populate(
            "wishList", "title thumb color sizes price gender category slug"
        )

    return res.status(200).json({
        success: user ? true : false,
        message: user ? "Register is successfully, please go to login" : " Something went wrong, please try again ... ",
        data: user ? user : "User is not found",
        errorCode: user ? 0 : -1
    })
})

const refreshAccesstoken = asyncHandler(async (req, res) => {
    // lấy token từ cookies
    const cookie = req.cookies
    // check xem có token hay không?
    if (cookie && !cookie.refreshToken) {
        throw new Error("No refresh token in cookies")
    }
    // check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({
        _id: rs._id,
        refreshToken: cookie.refreshToken
    })

    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken({
            _id: response._id,
            role: response.role
        }) : "Refresh token is not matched",
        errorCode: response ? 0 : -1
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) {
        throw new Error("no refresh token in cookies")
    }
    // tìm và xóa refresh token ở db
    await User.findOneAndUpdate({
        refreshToken: cookie.refreshToken
    }, { refreshToken: '' }, { new: true })
    res.clearCookie("refreshToken", { httpOnly: true, secure: true })
    return res.status(200).json({
        success: true,
        message: "Logout is successfully !",
        errorCode: 0
    })
})

//client gửi email
//server check email có hợp lệ không? => Gửi mail + kèm theo link (password change token)
//client check mail => click link
//client gửi api kèm token
//check token = server gửi qua mail hay không
//change pass

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new Error("Missing email")
    }
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        throw new Error("User not found")
    }
    const resetToken = user.createPasswordChanegToken()
    await user.save()

    const html = `
        Please click this link let change your password. This link will be expired after 15 minutes
        <a href="${process.env.URL_CLIENT}/reset-password/${resetToken}">Click here.</a>
    `
    const data = {
        email,
        html,
        subject: "Forgot password?"
    }
    const rsData = await sendMail(data)
    return res.status(200).json({
        success: true,
        data: rsData
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) {
        throw new Error("Missing inputs")
    }
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        throw new Error("Invalid reset token")
    }
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()

    return res.status(200).json({
        success: user ? true : false,
        message: user ? "Updated password" : "Something wrong, please try again ....",
        data: user ? user : '',
        errorcode: user ? 1 : 0
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    const excludeField = ['limit', 'sort', 'page', 'fields']
    excludeField.forEach(element => delete queries[element])
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedElement => `$${matchedElement}`)
    let formattedQueries = JSON.parse(queryString)
    if (queries?.name) {
        formattedQueries.name = { $regex: queries.name, $options: 'i' }
    }

    if (req.query.q) {
        delete formattedQueries.q
        formattedQueries['$or'] = [
            { firstName: { $regex: req.query.q, $options: 'i' } },
            { lastName: { $regex: req.query.q, $options: 'i' } },
            { email: { $regex: req.query.q, $options: 'i' } },
            { phone: { $regex: req.query.q, $options: 'i' } },
        ]
    }

    let queryCommand = User.find(formattedQueries)

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
        const counts = await User.find(formattedQueries).countDocuments()
        return res.status(200).json({
            counts: counts,
            success: counts > 0 ? true : false,
            data: counts > 0 ? response : 'cannot get users',
            errorCode: counts > 0 ? 1 : 0,
        })
    }).catch((err) => {
        console.log("Error: ", err)
    });
})

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const response = await User.findByIdAndDelete(userId)
    return res.status(200).json({
        success: response ? true : false,
        message: response ? `Delete user with email ${response.email} is successfully` : "Something wrong, please try again ....",
        errorcode: response ? 1 : 0
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { firstName, lastName, email, phone, address } = req.body
    const data = { firstName, lastName, email, phone, address }
    if (req.file) {
        data.avatar = req.file.path
    }
    if (!_id || Object.keys(req.body).length === 0) {
        throw new Error("Missing inputs")
    }
    const response = await User.findByIdAndUpdate(_id, data, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        message: response ? `Update information is successfully` : "Something wrong, please try again ....",
        data: response ? response : []
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error("Missing inputs")
    }
    const response = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        message: response ? `Update user is successfully` : "Something wrong, please try again ....",
        data: response ? response : [],
        errorcode: response ? 1 : 0
    })
})

const updateAddressUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) {
        throw new Error("Missing inputs")
    }
    const response = await User.findByIdAndUpdate(_id, { $addToSet: { address: req.body.address } }, { new: true }).select('-password -role -refreshToken -createdAt -updatedAt -__v -passwordChangedAt')
    return res.status(200).json({
        success: response ? true : false,
        message: response ? `Update address is successfully` : "Something wrong, please try again ....",
        data: response ? response : [],
        errorcode: response ? 1 : 0
    })
})

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { productId, quantity = 1, color, price, thumb, size } = req.body
    if (!productId || !color) {
        throw new Error("Missing inputs")
    }
    const user = await User.findById(_id).select("cart")
    const isExistProduct = user?.cart?.find(element => element.product.toString() === productId && element.color === color)
    if (isExistProduct) {
        const response = await User.updateOne({ cart: { $elemMatch: isExistProduct } },
            {
                $set: {
                    "cart.$.quantity": quantity,
                    "cart.$.price": price,
                    "cart.$.thumb": thumb,
                    "cart.$.size": size
                }
            },
            { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Updated is successfully` : "Something wrong, please try again ....",
            data: response ? response : [],
        })
    }
    else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: productId, size, quantity, color, price, thumb } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Update your cart is successfully` : "Something wrong, please try again ....",
            data: response ? response : [],
        })
    }
})

const removeProductInCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { productId, color } = req.params
    const user = await User.findById(_id).select("cart")
    const isExistProduct = user?.cart?.find(element => element.product.toString() === productId && element.color === color)
    if (!isExistProduct) {
        return res.status(200).json({
            success: response ? true : false,
            message: response && `Update cart is successfully`,
        })
    }
    const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { product: productId, color } } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        message: response ? `Update your cart is successfully` : "Something wrong, please try again ....",
        data: response ? response : [],
        errorcode: response ? 1 : 0
    })
})

const createUsers = asyncHandler(async (req, res) => {
    const response = await User.create(users)
    return res.status(200).json({
        success: response ? true : false,
        users: response ? response : "something went wrong ..."
    })
})

const updateWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { _id } = req.user
    const user = await User.findById(_id)
    const isInWishList = user.wishList?.find(element => element.toString() === productId)
    if (isInWishList) {
        const response = await User.findByIdAndUpdate(_id, { $pull: { wishList: productId } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'This product is removed form Wishlist' : "Failed to update wishlist"
        })
    }
    else {
        const response = await User.findByIdAndUpdate(_id, { $push: { wishList: productId } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Add product to Wish list is success' : "Failed to update wishlist"
        })
    }
})

module.exports = {
    register, login, getCurrent, refreshAccesstoken, logout, forgotPassword, resetPassword,
    getUsers, deleteUser, updateUser, updateUserByAdmin, updateAddressUser, updateCart, finalRegister,
    createUsers, removeProductInCart, updateWishlist
}