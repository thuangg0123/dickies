const router = require('express').Router()
const productCategoryController = require('../controllers/productCategoryController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, isAdmin, productCategoryController.createCategory)
router.get('/', productCategoryController.getAllCategories)
router.put('/:categoryId', verifyAccessToken, isAdmin, productCategoryController.updateCategory)
router.delete('/:categoryId', verifyAccessToken, isAdmin, productCategoryController.deleteCategory)

module.exports = router