const mongoose = require('mongoose');

const cart = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productCount:{
        type:Number,
        default:1
    }
})

module.exports = mongoose.model('cart',cart);