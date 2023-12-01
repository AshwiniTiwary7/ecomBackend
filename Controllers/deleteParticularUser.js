const user = require('../Model/user');

async function deleteUser(req,res){
    try {
        const {userId} = req.params;
        if(!userId){
            res.status(404).json({
                message:"Please provide Valid user"
            })
        }
        else{
            const specUser = await user.findByIdAndDelete({_id:userId});
            if(!specUser){
                res.status(404).json({
                    message:"The user you tryin to delete dont exist"
                })
            }
            else{
                res.status(200).json({
                    message:"User Deleted Successfully"
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

module.exports = deleteUser;