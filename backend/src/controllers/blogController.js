const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) {
        throw new Error("missing inputs")
    }
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot create blog'
    })
})

const getAllBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot get all blogs'
    })
})

const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error("Missing inputs")
    }
    const response = await Blog.findByIdAndUpdate(blogId, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot update blog'
    })
})

/* 
    khi người dùng like bài blog thì:
    1. check xem người đó đã từng dislike hay chưa?
    2. Nếu like thỉ bỏ like
    3. Nếu dislike thỉ bỏ dislike
    4. Nếu chưa like và chưa dislike thì like
*/

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { blogId } = req.params
    const blog = await Blog.findById(blogId)
    const isDisliked = blog?.dislikes?.find(element => element.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: _id } }, { new: true })

        return res.status(200).json({
            success: response ? true : false,
            data: response
        })
    }
    const isLiked = blog?.likes?.find(element => element.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(blogId, { $pull: { likes: _id } }, { new: true })

        return res.status(200).json({
            success: response ? true : false,
            data: response
        })
    }
    else {
        const response = await Blog.findByIdAndUpdate(blogId, { $push: { likes: _id } }, { new: true })

        return res.status(200).json({
            success: response ? true : false,
            data: response
        })
    }
})

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { blogId } = req.params
    if (!blogId) {
        throw new Error("missing inputs")
    }
    const blog = await Blog.findById(blogId)
    const isliked = blog?.likes?.find(element => element.toString() === _id)
    if (isliked) {
        const response = await Blog.findByIdAndUpdate(blogId, { $pull: { likes: _id } }, { new: true })

        return res.status(200).json({
            success: response ? true : false,
            data: response
        })
    }
    const isDisliked = blog?.dislikes?.find(element => element.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: _id } }, { new: true })

        return res.status(200).json({
            success: response ? true : false,
            data: response
        })
    }
    else {
        const response = await Blog.findByIdAndUpdate(blogId, { $push: { dislikes: _id } }, { new: true })

        return res.status(200).json({
            success: response ? true : false,
            data: response
        })
    }
})

const getBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const blog = await Blog.findByIdAndUpdate(blogId, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', 'firstName lastName')
        .populate('dislikes', 'firstName lastName')

    return res.status(200).json({
        success: blog ? true : false,
        data: blog
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const blog = await Blog.findByIdAndDelete(blogId)

    return res.status(200).json({
        success: blog ? true : false,
        data: blog ? 'delete blog success' : 'cannot delete blog'
    })
})

const uploadImageBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    if (!req.file) {
        throw new Error("missing inputs")
    }
    const response = await Blog.findByIdAndUpdate(blogId, { image: req.file.path }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'cannot upload image blog'
    })
})

module.exports = {
    createNewBlog,
    updateBlog,
    getAllBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog
}