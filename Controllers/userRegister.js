const user = require('../Model/user');
const bcrypt = require('bcrypt');

async function userResgister(req,res){
    try {
        const {fullName, mobile, userEmail, userPass} = req.body;
        if(!fullName, !mobile, !userEmail, !userPass){
            res.status(401).json({
                message:"All fields are neccessary"
            })
        }
        else{
            const alreadyExistingMo = await user.findOne({mobile:mobile});
            if(alreadyExistingMo){
                res.status(401).json({
                    message:"Already Exisiting Mobile Number! Use new one"
                })
            }
            else{
                const alreadyExistingEm = await user.findOne({userEmail:userEmail});
                if(alreadyExistingEm){
                    res.status(401).json({
                        message:"Already Existing Email! Use new one"
                    })
                }
                else{
                    try {
                        const encrptPass = await bcrypt.hash(userPass,10);
                        const userCreated = await user.create({fullName, mobile, userEmail, userPass:encrptPass});
                        res.status(200).json({
                            message:"User Registered Successfully! Login to Continue",
                            userData:userCreated
                        })
                    } catch (error) {
                        res.status(501).json({
                            message:"There was an error while securing your password!"
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

module.exports = userResgister;
