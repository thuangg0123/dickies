const jwt = require('jsonwebtoken')

const generateAccessToken = (userId, role) => {
    return jwt.sign({
        _id: userId,
        role: role
    }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const generateRefreshToken = (userId, role) => {
    return jwt.sign({
        _id: userId,
        role: role
    }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}