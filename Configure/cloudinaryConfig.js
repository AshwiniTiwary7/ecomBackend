const cloudinary = require('cloudinary').v2;
require("dotenv").config();

async function cloudConnect(){
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log("Connection Estbalised with Cloud ")
    } catch (error) {
        console.log(error);
    }
}

module.exports = cloudConnect;