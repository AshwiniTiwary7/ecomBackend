const cart = require('../Model/cart');

async function summaryCart(req,res){
    try {
        const {userId} = req.params;
        let total = 0;
        if(!userId || userId.length !== 24){
            res.status(401).json({
                message:"Invalid User"
            })
        }
        else{
            const userCart = await cart.find({userId:userId}).populate("productId");
            userCart.forEach((singleCart)=>{
                total = total + (singleCart.productId.productPrice * singleCart.productCount);
            })
            res.status(200).json({
                message:"Your Summary is here",
                grandTotal:total
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = summaryCart;