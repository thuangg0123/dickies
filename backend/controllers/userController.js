const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
        return res.status(500).json({
            sucess: false,
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
        const newUser = await User.create(req.body)
        return res.status(200).json({
            sucess: newUser ? true : false,
            message: newUser ? "Register is successfully, please go to login" : " Something went wrong, please try again ... ",
            data: newUser,
            errorCode: 0
        })
    }
})

// refreshToken dùng để cấp mới lại token
// accessToken dùng để xác thực người dùng, phân quyền user

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({
            sucess: false,
            message: "Missing inputs",
            errorCode: -1
        })
    }

    const response = await User.findOne({
        email: email
    })
    if (response && await response.isCorrectPassword(password)) {
        // tách password và role ra khỏi response
        const { password, role, ...userData } = response.toObject()
        // tạo access token
        const accessToken = generateAccessToken(response._id, role)
        // tạo refresh token
        const refreshToken = generateRefreshToken(response._id, role)
        // lưu refresh token vào database 
        await User.findByIdAndUpdate(response._id, { refreshToken: refreshToken }, { new: true })
        // lưu refresh token vào cookie
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            sucess: true,
            message: "Login successfully !",
            accessToken: accessToken,
            refreshToken: refreshToken,
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
    const user = await User.findById({
        _id: _id
    }).select('-refreshToken -password -role')

    return res.status(200).json({
        sucess: false,
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
        sucess: response ? true : false,
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
        sucess: true,
        message: "Logout is successfully !",
        errorCode: 0
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccesstoken,
    logout
}