const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            color: String,
            price: Number,
            thumb: String,
            size: String,
        }
    ],
    status: {
        type: String,
        default: "Processing",
        enum: ['Cancelled', 'Processing', 'Succeed']
    },
    paymentIntent: {

    },
    total: Number,
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);