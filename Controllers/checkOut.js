const user = require('../Model/user');
const orderhistory = require('../Model/orderhistory');
const cart = require('../Model/cart');

async function checkoutCart(req,res){
    try {
        const {userId} = req.params;
        if(!userId || userId.length !== 24){
            res.status(401).json({
                message:"Invalid User! Login Again"
            })
        }
        else{
            const userExist = await user.findById({_id:userId});
            if(!userExist){
                res.status(404).json({
                    message:"There is no such user with this name or id"
                })
            }
            else{
               await orderhistory.updateMany({userId:userId} ,{placedOrder:true});
               await cart.deleteMany({userId:userId});
                res.status(200).json({
                    message:"Checked out Successfully"
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

module.exports = checkoutCart;