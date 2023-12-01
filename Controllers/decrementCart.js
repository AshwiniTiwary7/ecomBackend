const cart = require('../Model/cart');

async function decrementCart(req,res,next){
    try {
        const {userId , cartId} = req.params;
        if(!userId || !cartId || userId.length !== 24 || cartId.length !== 24){
            res.status(401).json({
                message:"Invalid User or Cart Item"
            })
        }
        else{
            const decExistingProduct = await cart.findOne({_id:cartId, userId:userId});
            if(decExistingProduct.productCount > 1){
                await cart.findOneAndUpdate({_id:cartId, userId:userId},{productCount:decExistingProduct.productCount - 1});
                res.status(200).json({
                    message:"Decremented Your Product"
                })
            }
            else{
                next();
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = decrementCart;