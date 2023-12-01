const mongoose = require('mongoose');

const shipping = new mongoose.Schema({
    fullAddress:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true
    },
    forAddress:{
        type:String,
        enum:["Home","Work"],
        default:"Home"
    },
    forUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model('shipping',shipping);