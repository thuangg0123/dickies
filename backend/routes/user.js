const router = require('express').Router()
const userControllner = require('../controllers/userController')
const { verifyAccessToken } = require('../middleware/verifyToken')


router.post("/register", userControllner.register)
router.post("/login", userControllner.login)
router.get("/current", verifyAccessToken, userControllner.getCurrent)

module.exports = router