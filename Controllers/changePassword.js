const user = require('../Model/user');
const bcrypt = require('bcrypt');

async function changepassword(req,res){
    try {
        const {userId} = req.params;
        const {userPass, userPassConfirm} = req.body;
        if(!userId || userId.length !== 24){
            res.status(401).json({
                message:"Request from invalid user"
            })
        }
        else{
            if(!userPass || !userPassConfirm){
                res.status(401).json({
                    message:"All Fields are neccessary"
                })
            }
            else{
                if(userPass !== userPassConfirm){
                    res.status(401).json({
                        message:"Password and Confirm Password Didnt Match"
                    })
                }
                else{
                    try {
                        const hashedPass = await bcrypt.hash(userPass,10);
                        const passUpdated = await user.findByIdAndUpdate({_id:userId},{userPass:hashedPass});
                        if(!passUpdated){
                            res.status(404).json({
                                message:"User Not Found"
                            })
                        }
                        else{
                            res.status(200).json({
                                message:"Password Updated Successfully"
                            })
                        }
                    } catch (error) {
                        res.status(501).json({
                            message:"There was an error while securing your password"
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

module.exports = changepassword;