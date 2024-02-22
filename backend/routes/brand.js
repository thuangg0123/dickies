const router = require('express').Router()
const brandController = require('../controllers/brandController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, isAdmin, brandController.createBrand)
router.get('/', brandController.getAllBrands)

router.get('/:brandId', brandController.getBrand)
router.put('/:brandId', verifyAccessToken, isAdmin, brandController.updateBrand)
router.delete('/:brandId', verifyAccessToken, isAdmin, brandController.deleteBrand)

module.exports = router