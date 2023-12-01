const user = require('../Model/user');
const cart = require('../Model/cart');
const orderhistory = require('../Model/orderhistory');

async function deleteCart(req,res){
    try {
        const {userId , cartId} = req.params;
        if(!userId || !cartId || userId.length !== 24 || cartId.length !== 24){
            res.status(401).json({
                message:"Invalid User or Cart Item"
            })
        }
        else{
            const userExist = await user.findById({_id:userId});
            if(!userExist){
                res.status(404).json({
                    message:"Cannot Perform this action as user doesnot exist"
                })
            }
            else{
                const deleteCartItem = await cart.findByIdAndDelete({_id:cartId});
                if(deleteCartItem){
                    await user.findByIdAndUpdate({_id:userId},{$pull:{userCart:deleteCartItem._id}});
                    await orderhistory.deleteMany({userId:userId,productId:deleteCartItem.productId,placedOrder:false});
                    res.status(200).json({
                        message:"Item Removed from cart"
                    })
                }
                else{
                    res.status(404).json({
                        message:"Cannot delete an item that dont exist"
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

module.exports = deleteCart;