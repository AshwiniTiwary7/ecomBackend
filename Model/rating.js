const mongoose = require('mongoose');

const rating = new mongoose.Schema({
    totalRating:{
        type:Number
    },
    totalUserRated:{
        type:Number
    },
    forProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    totalPercentage:{
        type:Number
    },
    ratedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    messageUser:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('rating',rating);