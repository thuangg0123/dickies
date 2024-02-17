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

    const response = await Users.create(req.body)
    return res.status(200).json({
        sucess: response ? true : false,
        response,
        errorCode: 0
    })
})

module.exports = {
    register
}