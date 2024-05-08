const router = require('express').Router()
const blogController = require('../controllers/blogController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')
const uploader = require('../config/cloudinaryConfig')

router.post('/', verifyAccessToken, isAdmin, blogController.createNewBlog)
router.get('/', blogController.getAllBlogs)
router.put('/upload-image-blog/:blogId', verifyAccessToken, isAdmin, uploader.single('image'), blogController.uploadImageBlog)

router.get('/:blogId', blogController.getBlog)
router.put('/like/:blogId', verifyAccessToken, blogController.likeBlog)
router.put('/dislike/:blogId', verifyAccessToken, blogController.dislikeBlog)
router.delete('/:blogId', verifyAccessToken, isAdmin, blogController.deleteBlog)
router.put('/:blogId', verifyAccessToken, isAdmin, blogController.updateBlog)

module.exports = router