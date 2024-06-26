const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')
const uploader = require('../config/cloudinaryConfig')

router.post("/register", userController.register)
router.post("/mock", userController.createUsers)
router.put("/final-register/:token", userController.finalRegister)
router.post("/login", userController.login)
router.get("/current", verifyAccessToken, userController.getCurrent)
router.post("/refresh-token", userController.refreshAccesstoken)
router.post("/logout", userController.logout)
router.post("/forgot-password", userController.forgotPassword)
router.put("/reset-password", userController.resetPassword)

router.get("/", verifyAccessToken, isAdmin, userController.getUsers)
router.put("/current", verifyAccessToken, uploader.single('avatar'), userController.updateUser)
router.delete("/:userId", verifyAccessToken, isAdmin, userController.deleteUser)
router.put("/wishlist/:productId", verifyAccessToken, userController.updateWishlist)
router.put("/update-address", verifyAccessToken, isAdmin, userController.updateAddressUser)
router.put("/cart", verifyAccessToken, userController.updateCart)
router.delete("/remove-cart/:productId/:color", verifyAccessToken, userController.removeProductInCart)
router.put("/update-user-by-admin/:userId", verifyAccessToken, isAdmin, userController.updateUserByAdmin)

//CREATE (POST) + PUT: body
//GET + DELETE: query // ?abc&dkjas

module.exports = router