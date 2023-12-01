const user = require("../Model/user");

async function getUserDetails(req,res){
    try {
        const {userId} = req.params;
        if(!userId || await userId.length !== 24){
            res.status(401).json({
                message:"Invalid User"
            })
        }
        else{
            const foundUser = await user.findById({_id:userId});
            if(!foundUser){
                res.status(404).json({
                    message:"User Not-Found"
                })
            }
            else{
                foundUser.userPass = undefined;
                res.status(200).json({
                    message:"User Fetched Successfully",
                    userDetails:foundUser
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = getUserDetails;