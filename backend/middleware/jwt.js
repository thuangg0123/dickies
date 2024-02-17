const jwt = require('jsonwebtoken')

const generateAccessToken = (userId, role) => {
    return jwt.sign({
        _id: userId,
        role: role
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const generateRefreshToken = (userId, role) => {
    return jwt.sign({
        _id: userId,
        role: role
    }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}