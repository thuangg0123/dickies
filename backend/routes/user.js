const router = require('express').Router()
const userControllner = require('../controllers/userController')
const { verifyAccessToken } = require('../middleware/verifyToken')


router.post("/register", userControllner.register)
router.post("/login", userControllner.login)
router.get("/current", verifyAccessToken, userControllner.getCurrent)
router.post("/refresh-token", userControllner.refreshAccesstoken)
router.post("/logout", userControllner.logout)
router.get("/forgot-password", userControllner.forgotPassword)
router.put("/reset-password", userControllner.resetPassword)

//CREATE (POST) + PUT: body
//GET + DELETE: query // ?abc&dkjas

module.exports = router