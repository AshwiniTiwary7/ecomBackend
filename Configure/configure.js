const mongoose = require('mongoose');
require('dotenv').config();

const dbCon = ()=>{
    mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('DB CONNECTED');
    })
    .catch((err)=>{
        console.error(err);
    })
}

module.exports = dbCon;