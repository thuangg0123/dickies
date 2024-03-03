const mongoose = require('mongoose'); // Erase if already required
const asyncHandler = require('express-async-handler')

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['men', 'women', 'kids'],
        required: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    color: {
        type: [String],
        require: true
    },
    ratings: [
        {
            star: Number,
            postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
            comment: { type: String }
        },
    ],
    totalRatings: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
//Export the model
module.exports = mongoose.model('Product', productSchema);