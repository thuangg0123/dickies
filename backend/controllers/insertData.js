const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const data = require("../data/data_dickies.json")
var slugify = require('slugify')
const categoryData = require('../data/cate_brand')
const ProductCategory = require('../models/productCategory')

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name),
        description: product?.description,
        brand: product?.brand,
        price: product?.price,
        thumb: product?.thumb,
        category: product?.category,
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 1000),
        images: product?.images,
        color: product?.color,
        gender: product?.gender,
        totalRatings: Math.round(Math.random() * 5)
    })
}

const insertProduct = asyncHandler(async (req, res) => {
    const promises = []
    for (let product of data) {
        promises.push(fn(product))
    }
    await Promise.all(promises)
    return res.json("Done")
})

const fn2 = async (cate) => {
    await ProductCategory.create({
        title: cate?.cate,
        brand: cate?.brand,
        img: cate?.img,
    })
}

const insertCategory = asyncHandler(async (req, res) => {
    const promises = []
    for (let cate of categoryData) {
        promises.push(fn2(cate))
    }
    await Promise.all(promises)
    return res.json("Done")
})

module.exports = {
    insertProduct,
    insertCategory
}