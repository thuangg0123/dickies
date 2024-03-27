const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post("/register", userController.register)
router.get("/final-register/:token", userController.finalRegister)
router.post("/login", userController.login)
router.get("/current", verifyAccessToken, userController.getCurrent)
router.post("/refresh-token", userController.refreshAccesstoken)
router.post("/logout", userController.logout)
router.post("/forgot-password", userController.forgotPassword)
router.put("/reset-password", userController.resetPassword)

router.get("/", verifyAccessToken, isAdmin, userController.getUsers)
router.delete("/", verifyAccessToken, isAdmin, userController.deleteUser)
router.put("/update", verifyAccessToken, userController.updateUser)
router.put("/update-address", verifyAccessToken, isAdmin, userController.updateAddressUser)
router.put("/update-cart", verifyAccessToken, isAdmin, userController.updateCart)

router.put("/update-user-by-admin/:userId", verifyAccessToken, isAdmin, userController.updateUserByAdmin)

//CREATE (POST) + PUT: body
//GET + DELETE: query // ?abc&dkjas

module.exports = router