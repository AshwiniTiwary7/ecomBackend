const product = require('../Model/product');

async function specProduct(req,res){
    try {
        const {productType} = req.params;
        if(!productType){
            res.status(404).json({
                message:"This is an unspecified Category"
            })
        }
        else{
            const specificProduct = await product.find({productSubCategory:productType});
            res.status(200).json({
                message:`${productType} products are here`,
                productData:specificProduct
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = specProduct;