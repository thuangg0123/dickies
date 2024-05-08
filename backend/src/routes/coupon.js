const router = require('express').Router()
const couponController = require('../controllers/couponController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, isAdmin, couponController.createNewCoupon)
router.get('/', couponController.getAllCoupons)

router.put('/:couponId', verifyAccessToken, isAdmin, couponController.updateCoupon)
router.delete('/:couponId', verifyAccessToken, isAdmin, couponController.deleteCoupon)
router.get('/:couponId', couponController.getCoupon)

module.exports = router