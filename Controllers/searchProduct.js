const product = require('../Model/product');

async function searchProduct(req,res){
    try {
        const {searchQ} = req.params;
        if(!searchQ){
            const allPrduct = await product.find({});
            res.status(200).json({
                searchedFor:allPrduct
            })
        }
        else{
            const foundQuery = await product.find({productSubCategory:searchQ.toLowerCase()});
            res.status(200).json({
                searchedFor:foundQuery
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = searchProduct;