const product = require('../Model/product');

async function catProduct(req,res){
    try {
        const {catType} = req.params;
        if(!catType){
            res.status(404).json({
                message:"No Product which this category found"
            })
        }
        else{
            const catAllProduct = await product.find({productCategory:catType});
            res.status(200).json({
                message:"All product with Category fetched",
                catProductDet:catAllProduct
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = catProduct;