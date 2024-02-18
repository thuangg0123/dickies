const router = require('express').Router()
const userControllner = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')


router.post("/register", userControllner.register)
router.post("/login", userControllner.login)
router.get("/current", verifyAccessToken, userControllner.getCurrent)
router.post("/refresh-token", userControllner.refreshAccesstoken)
router.post("/logout", userControllner.logout)
router.get("/forgot-password", userControllner.forgotPassword)
router.put("/reset-password", userControllner.resetPassword)
router.get("/", verifyAccessToken, isAdmin, userControllner.getUsers)
router.delete("/", verifyAccessToken, isAdmin, userControllner.deleteUser)
router.put("/update", verifyAccessToken, userControllner.updateUser)
router.put("/update-user-by-admin/:userId", verifyAccessToken, isAdmin, userControllner.updateUserByAdmin)

//CREATE (POST) + PUT: body
//GET + DELETE: query // ?abc&dkjas

module.exports = router