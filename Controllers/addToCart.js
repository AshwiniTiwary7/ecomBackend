const user = require('../Model/user');
const product = require('../Model/product');
const cart = require('../Model/cart');
const orderhistory = require('../Model/orderhistory');

async function addCart(req,res){
    try {
        const {proId, userId} = req.params;
        if(!proId || !userId || proId.length !== 24 || userId.length !== 24){
            res.status(401).json({
                message:"Invaild credentials! Please re-verify"
            })
        }
        else{
            const productFound = await product.findById({_id:proId});
            if(!productFound){
                res.status(404).json({
                    message:"Cannot add an product that does not exist"
                })
            }
            else{
                const userFound = await user.findById({_id:userId});
                if(!userFound){
                    res.status(404).json({
                        message:"There was an techincal error! Please login again"
                    })
                }
                else{
                    const cartProductAlready = await cart.findOne({productId:proId,userId:userId});
                    if(cartProductAlready){
                       const cartUpdated =  await cart.findByIdAndUpdate({_id:cartProductAlready._id},{productCount:cartProductAlready.productCount + 1},{new:true});
                        res.status(200).json({
                            message:"Incremented Your Product",
                            cartDet:cartUpdated
                        })
                    }
                    else{
                        const cartCreated = await cart.create({productId:proId,userId:userId});
                        const orderTrack = await orderhistory.create({userId:userId,productId:proId});
                        await user.findByIdAndUpdate({_id:userId},{$push:{userCart:cartCreated._id}});
                        await user.findByIdAndUpdate({_id:userId},{$push:{orderHistory:orderTrack._id}})
                        res.status(200).json({
                            message:"Added to cart",
                            cartDet:cartCreated
                        })
                    }
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

module.exports = addCart;