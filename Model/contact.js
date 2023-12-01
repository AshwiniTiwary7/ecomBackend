const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userMessage:{
        type:String,
        required:true
    },
    queryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});

module.exports = mongoose.model('contact',contact);