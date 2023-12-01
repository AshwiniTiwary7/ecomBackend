const product = require('../Model/product');
const cart = require('../Model/cart');
const orderhistory = require('../Model/orderhistory');
const rating = require('../Model/rating');

async function deleteProduct(req,res){
    try {
        const {productId} = req.params;
        if(!productId || productId.length !== 24){
            res.status(401).json({
                message:"Invalid Product"
            })
        }
        else{
            const deleltedProduct = await product.findByIdAndDelete({_id:productId});
            if(!deleltedProduct){
                res.status(404).json({
                    message:"Cannot Delete a Product that doesnt exist"
                })
            }
            else{
                await cart.deleteMany({productId:productId});
                await orderhistory.deleteMany({productId:productId});
                await rating.deleteMany({forProduct:productId});
                res.status(200).json({
                    message:"Product Deleted from Database"
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = deleteProduct;