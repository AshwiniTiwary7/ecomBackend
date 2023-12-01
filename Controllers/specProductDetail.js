const product = require('../Model/product');

async function fetchProdutDetails(req,res){
    try {
        const {productId} = req.params;
        if(!productId || productId.length !== 24){
            res.status(404).json({
                message:"Invalid request for product"
            })
        }
        else{
            const particularProduct = await product.findById({_id:productId}).populate("productRating");
            const ratingData = await product.findById({_id:productId}).populate({path:"productRating" , populate:{path:"ratedBy"}}).exec();
            if(!particularProduct){
                res.status(404).json({
                    message:"Cannot find the product data your looking for!"
                })
            }
            else{
                const productRating = particularProduct.productRating;
                if(productRating.length === 0){
                    res.status(200).json({
                        message:"Product data is here",
                        productData:particularProduct,
                        productPerRated:0,
                        ratings:ratingData.productRating
                    })
                }
                else{
                    res.status(200).json({
                        message:"Product data is here",
                        productData:particularProduct,
                        productPerRated:productRating[productRating.length - 1].totalPercentage,
                        ratings:ratingData.productRating
                    })
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

module.exports = fetchProdutDetails;