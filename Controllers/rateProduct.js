const rating = require('../Model/rating');
const product = require('../Model/product');

async function ratingProduct(req, res) {
    try {
        const { productId , userId} = req.params;
        const { ratingUser, messageRating } = req.body;
        if (!productId || !ratingUser || productId.length !== 24 || userId.length !== 24 || !messageRating) {
            res.status(401).json({
                message: "Rating and Message both help improve rating quality! Add both"
            })
        }
        else {
            const producToRated = await product.findById({ _id: productId });
            if (!producToRated) {
                res.status(404).json({
                    message: "Cannot rate a product which doesnt exist"
                })
            }
            else {
                const alreadyRated = await rating.findOne({forProduct: productId, ratedBy: userId});
                if(alreadyRated){
                    res.status(401).json({
                        message:"You have already rated this product",
                        userRate:alreadyRated,
                        yourRating:ratingUser
                    })
                }
                else{
                    const ratingAll = await rating.find({ forProduct: productId });
                function calculateRating(tRate, tUser) {
                    return (tRate / (tUser * 5)) * 100;
                }
                if (ratingAll.length === 0) {
                    const percentRating = calculateRating(ratingUser, 1);
                   const singleRating =  await rating.create({ totalRating: ratingUser, totalUserRated: 1, forProduct: productId, totalPercentage: percentRating , ratedBy:userId, messageUser:messageRating});
                   await product.findByIdAndUpdate({_id:productId},{$push:{productRating:singleRating._id}},{new:true});
                    res.status(200).json({
                        message: "Rated Successfully,Reload the Page",
                        percentageRating: percentRating,
                        userRated:1
                    })
                }
                else {
                    let totalRate = await ratingUser + ratingAll[ratingAll.length - 1].totalRating;
                    let numberofUser = ratingAll[ratingAll.length - 1].totalUserRated + 1;

                    const ratingPer = calculateRating(totalRate, numberofUser);
                    const multipleRating = await rating.create({ totalRating: totalRate, totalUserRated: numberofUser, forProduct: productId, totalPercentage: ratingPer, ratedBy:userId, messageUser:messageRating });
                    await product.findByIdAndUpdate({_id:productId},{$push:{productRating:multipleRating._id}},{new:true});
                    res.status(200).json({
                        message: "Rated Successfully,Reload the Page",
                        percentageRating: ratingPer,
                        userRated:numberofUser
                    })
                }
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

module.exports = ratingProduct;