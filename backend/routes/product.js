const router = require('express').Router()
const productController = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')
const uploader = require('../config/cloudinaryConfig')

router.post('/', verifyAccessToken, isAdmin, productController.createProduct)
router.get('/', productController.getAllProducts)
router.put('/ratings', verifyAccessToken, productController.ratings)
router.put('/upload-image/:productId', verifyAccessToken, isAdmin, uploader.array('images', 10), productController.uploadImageProduct)

router.put('/:productId', verifyAccessToken, isAdmin, productController.updateProduct)
router.delete('/:productId', verifyAccessToken, isAdmin, productController.deleteProduct)
router.get('/:productId', productController.getProduct)

module.exports = router

