const router = require('express').Router()
const orderController = require("../controllers/orderController")
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, orderController.createNewOrder)
router.get('/admin', verifyAccessToken, isAdmin, orderController.getOrders)
router.get('/', verifyAccessToken, orderController.getUserOrders)
router.get('/:orderId', verifyAccessToken, isAdmin, orderController.getDetailOrder)
router.put('/update-status/:orderId', verifyAccessToken, isAdmin, orderController.updateStatus)

module.exports = router