const user = require('../Model/user');
const cart = require('../Model/cart');

async function getAllCart(req,res){
    try {
        const {userId} = req.params;
        if(!userId || userId.length !== 24){
            res.status(401).json({
                message:"Invaid arguments"
            })
        }
        else{
            const userCartData = await user.findById({_id:userId}).populate({path:"userCart",populate:{path:"productId"}}).exec();
            if(!userCartData){
                res.status(404).json({
                    message:"No User Found"
                })
            }
            else{
                res.status(200).json({
                    message:"All Cart data are here",
                    cartForUser:userCartData.userCart
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

module.exports = getAllCart;