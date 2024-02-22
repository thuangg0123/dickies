const router = require('express').Router()
const blogController = require('../controllers/blogController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAccessToken, isAdmin, blogController.createNewBlog)
router.get('/', blogController.getAllBlogs)
router.put('/like/:blogId', verifyAccessToken, blogController.likeBlog)

router.get('/:blogId', blogController.getBlog)
router.delete('/:blogId', verifyAccessToken, isAdmin, blogController.deleteBlog)
router.put('/dislike/:blogId', verifyAccessToken, blogController.dislikeBlog)
router.put('/:blogId', verifyAccessToken, isAdmin, blogController.updateBlog)

module.exports = router