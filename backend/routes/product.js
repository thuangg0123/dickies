const router = require('express').Router()
const productController = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, isAdmin, productController.createProduct)
router.get('/', productController.getAllProducts)

router.put('/:productId', verifyAccessToken, isAdmin, productController.updateProduct)
router.delete('/:productId', verifyAccessToken, isAdmin, productController.deleteProduct)
router.get('/:productId', productController.getProduct)

module.exports = router

