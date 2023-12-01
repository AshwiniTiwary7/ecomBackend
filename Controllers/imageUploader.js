const cloudinary = require('cloudinary').v2;
const product = require('../Model/product');
require("dotenv").config();

async function cloudUpload(req,res){
    try {
        const { productName, productPrice, productDesc, productCategory, productSubCategory } = req.body;
        if(!req.files){
            res.status(401).json({
                message:"Image for Product is neccessary! It makes product Catchy"
            })
        }
        else{
            if(!productName, !productPrice, !productDesc, !productCategory, !productSubCategory){
                res.status(404).json({
                    message:"All fields are neccessary"
                })
            }
            else{
                const imageFile = req.files.imageFile;
                if(!imageFile){
                    res.status(404).json({
                        message:"Looks like there was an error while adding image"
                    })
                }
                else{
                    async function cloudImage(file,folder){
                        try {
                            const options = {folder};
                            const cloudUploadImage = await cloudinary.uploader.upload(file.tempFilePath,options);
                            if(!cloudUploadImage.secure_url){
                                res.status(402).json({
                                    message:"The image you uploaded in corrupted"
                                })
                            }
                            else{
                                const productAdded = await product.create({ productName, productPrice, productDesc, productCategory, productSubCategory, productImage:cloudUploadImage.secure_url });
                                res.status(200).json({
                                    message:"Product Added to our Inventory",
                                    productDetails:productAdded
                                })
                            }
                        } catch (error) {
                            res.status(501).json({
                                message:"There was an error from our cloud network or Database"
                            })
                        }
                    }
                    cloudImage(imageFile,"EcomImages");
                }
            }
        }
    } catch (error) {
     console.log(error);
     res.status(500).json({
        message:"Sorry! There was an server-side error"
     })   
    }
}

module.exports = cloudUpload;