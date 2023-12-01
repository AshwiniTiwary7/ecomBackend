const user = require('../Model/user');

async function checkAdmin(req,res,next){
    try {
        const userId = req.useId;
        if(!userId){
            res.status(404).json({
                message:"Looks like the token was corrupted! Login Again"
            })
        }
        else{
            const adminSearch = await user.findById({_id:userId});
            if(!adminSearch){
                res.status(404).json({
                    message:"Cannot find the user profile!"
                })
            }
            else{
                if(adminSearch.isAdmin === true){
                    next();
                }
                else{
                    res.status(401).json({
                        message:"Only user with Role-[Admin] can access this option!"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).json({
            message:"Sorry!There was an error while validating Token"
        })
    }
}

module.exports = checkAdmin;