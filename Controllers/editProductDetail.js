const product = require('../Model/product');

async function editProduct(req,res){
    try {
        const {productId} = req.params;
        const {productName,productPrice,productDesc} = req.body;
        if(!productId || productId.length !== 24){
            res.status(401).json({
                message:"Invalid Product"
            })
        }
        else{
            if(!productName || !productPrice || !productDesc){
                res.status(404).json({
                    message:"All fields are mandatory"
                })
            }
            else{
                const productFound = await product.findByIdAndUpdate({_id:productId},{productName:productName,productPrice:productPrice,productDesc:productDesc});
                if(!productFound){
                    res.status(404).json({
                        message:"No product found with this id"
                    })
                }
                else{
                    res.status(200).json({
                        message:"Product Updated Successfully"
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

module.exports = editProduct;