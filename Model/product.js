const mongoose = require('mongoose');

const product = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDesc:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        enum:["women","men","kid"],
        default:"women"
    },
    productSubCategory:{
        type:String,
        enum:["womendresses","womenskirts","womenpants","menshirts","menpants","menhoodies","kidshirts","kidpants"],
        default:"womendresses"
    },
    productImage:{
        type:String,
        required:true
    },
    productRating:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"rating"
    }]
})

module.exports = mongoose.model('product',product);
