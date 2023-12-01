const user = require('../Model/user');

async function verifyOtp(req,res){
    try {
        const {userEmail,otp} = req.body;
        if(!userEmail || !otp){
            res.status(401).json({
                message:"All Fileds are neccessary"
            })
        }
        else{
            const userFound = await user.findOne({userEmail:userEmail});
            if(!userFound){
                res.status(404).json({
                    message:"Cannot find the user you are reseting password"
                })
            }
            else{
                if(userFound.otp == otp){

                    res.status(200).json({
                        message:"OTP Matched",
                        userId:userFound._id
                    })
                }
                else{
                    res.status(401).json({
                        message:"Invalid OTP"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry!There was an server-side error"
        })
    }
}

module.exports = verifyOtp;