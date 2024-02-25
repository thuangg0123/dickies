const router = require('express').Router()
const orderController = require("../controllers/orderController")
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, orderController.createNewOrder)
router.get('/', verifyAccessToken, orderController.getUserOrder)
router.get('/get-all-orders', verifyAccessToken, isAdmin, orderController.getAllOrders)

router.put('/update-status/:orderId', verifyAccessToken, isAdmin, orderController.updateStatus)

module.exports = router