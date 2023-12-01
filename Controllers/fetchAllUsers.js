const user = require('../Model/user');

async function fetchAllUser(req,res){
    try {
        const allUser = await user.find({});
        res.status(200).json({
            message:"All Users Fetched",
            allUser:allUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = fetchAllUser;