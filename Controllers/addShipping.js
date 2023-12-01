const shipping = require('../Model/shipping');
const user = require('../Model/user');

async function addShipping(req, res) {
    try {
        const { userId } = req.params;
        const { fullAddress, landMark, forAddress } = req.body;

        if (!userId || userId.length !== 24 || !fullAddress || !landMark) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        else {
            const foundUser = await user.findById({ _id: userId });
            if (!foundUser) {
                res.status(404).json({
                    message: "User doesnt exist"
                })
            }
            else {
                const alreadyAddress = await shipping.findOne({ fullAddress, landMark, forAddress });
                if (alreadyAddress) {
                    res.status(200).json({
                        message: "We will deliver to your saved address"
                    })
                }
                else {
                    const shippingAdded = await shipping.create({ fullAddress, landMark, forAddress, forUser: userId });
                    await user.findByIdAndUpdate({ _id: userId }, { $push: { userAddress: shippingAdded._id } });
                    res.status(200).json({
                        message: "Added Shipping Details",
                        shippingDetail: shippingAdded
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry! There was an server-side error"
        })
    }
}

module.exports = addShipping;