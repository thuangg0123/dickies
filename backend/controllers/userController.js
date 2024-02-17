const User = require('../models/user')
const asyncHandler = require('express-async-handler')

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
        const { password, role, ...userData } = response.toObject()
        return res.status(200).json({
            sucess: true,
            message: "Login successfully !",
            userData: userData,
            errorCode: 0
        })
    }
    else {
        throw new Error("Invalid credentials")
    }
})

module.exports = {
    register,
    login
}