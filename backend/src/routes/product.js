const router = require('express').Router()
const productController = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')
const uploader = require('../config/cloudinaryConfig')

router.post('/', verifyAccessToken, isAdmin, uploader.fields([{ name: "images", maxCount: 10 }, { name: "thumb", maxCount: 1 }]), productController.createProduct)
router.get('/', productController.getAllProducts)
router.put('/ratings', verifyAccessToken, productController.ratings)
router.put('/upload-image/:productId', verifyAccessToken, isAdmin, uploader.array('images', 10), productController.uploadImageProduct)
router.put('/variant/:productId', verifyAccessToken, isAdmin, uploader.fields([{ name: "images", maxCount: 10 }, { name: "thumb", maxCount: 1 }]), productController.addVariant)
router.put('/:productId', verifyAccessToken, isAdmin, uploader.fields([{ name: "images", maxCount: 10 }, { name: "thumb", maxCount: 1 }]), productController.updateProduct)
router.delete('/:productId', verifyAccessToken, isAdmin, productController.deleteProduct)
router.get('/:productId', productController.getProduct)

module.exports = router

