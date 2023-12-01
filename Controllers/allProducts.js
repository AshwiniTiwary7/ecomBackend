const product = require('../Model/product');

async function getAllProducts(req, res) {
    try {
        const { filterData } = req.params;
        const newFilter = Number(filterData);
        if (!filterData) {
            res.status(401).json({
                message: "Invalid Params"
            })
        }
        else {
            const allProd = await product.find({}).sort({ productPrice: newFilter });
            res.status(200).json({
                message: "All products are here",
                allProD: allProd
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry! There was an server-side error"
        })
    }
}

module.exports = getAllProducts;