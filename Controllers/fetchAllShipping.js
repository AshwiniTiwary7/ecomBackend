const shipping = require('../Model/shipping');

async function allShipDetail(req,res){
    try {
        const {userId} = req.params;
        if(!userId || userId.length !== 24){
            res.status(401).json({
                message:"You need to login to access this route"
            })
        }
        else{
            const fetchAllShipping = await shipping.find({forUser:userId});
            res.status(200).json({
                message:"All address are here",
                allShipping:fetchAllShipping
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = allShipDetail;