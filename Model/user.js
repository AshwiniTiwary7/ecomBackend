const mongoose = require('mongoose');

const user = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    userPass:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    userCart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    }],
    userQueries:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"contact"
    }],
    userAddress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shipping"
    }],
    orderHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderhistory"
    }],
    otp:{
        type:Number,
        expires:"2m"
    }
});

module.exports = mongoose.model('user',user);