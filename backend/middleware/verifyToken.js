const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    //headers: {authorization: Bearer token}
    if (req.headers?.authorization?.startsWith("Bearer")) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    succes: false,
                    message: "Invalid access token",
                    errorCode: -1,
                })
            }
            req.user = decode
            next()
        })
    }
    else {
        return res.status(401).json({
            succes: false,
            message: "Require authentication !!!",
            errorCode: -1,
        })
    }
})

module.exports = {
    verifyAccessToken
}