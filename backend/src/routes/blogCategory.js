const router = require('express').Router()
const blogCategoryController = require('../controllers/blogCategoryController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, isAdmin, blogCategoryController.createBlogCategory)
router.get('/', blogCategoryController.getAllBlogCategories)
router.put('/:blogCategoryId', verifyAccessToken, isAdmin, blogCategoryController.updateBlogCategory)
router.delete('/:blogCategoryId', verifyAccessToken, isAdmin, blogCategoryController.deleteBlogCategory)

module.exports = router