const user = require('../Model/user');
const orderhistory = require('../Model/orderhistory');

async function orderPlacedList(req,res){
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
                const allChecked = await orderhistory.find({userId:userId,placedOrder:true},{new:true}).populate('productId').exec();
                res.status(200).json({
                    message:"All Product Checkout are here",
                    orderPlaced:allChecked
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

module.exports = orderPlacedList;