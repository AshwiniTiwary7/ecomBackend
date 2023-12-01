const mongoose = require('mongoose');

const orderhistory = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    placedOrder:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('orderhistory',orderhistory);