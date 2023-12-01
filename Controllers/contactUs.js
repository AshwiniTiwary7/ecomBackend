const contact = require('../Model/contact');
const user = require('../Model/user');

async function userQuery(req,res){
    try {
        const {userId} = req.params;
        const {fullName, userEmail, userMessage} = req.body;
        if(!userId || userId.length !==24){
            res.status(401).json({
                message:"Invalid User"
            })
        }
        else{
            if(!fullName || !userEmail || !userMessage){
                res.status(401).json({
                    message:"All fields are neccessary"
                })
            }
            else{
                const userFound = await user.findById({_id:userId});
                if(!userFound){
                    res.status(404).json(({
                        message:"User Not Found"
                    }))
                }
                else{
                    const queryCreated = await contact.create({fullName, userEmail, userMessage, queryBy:userId});
                    await user.findByIdAndUpdate({_id:userId},{$push:{userQueries:queryCreated._id}});
                    res.status(200).json({
                        message:"We will react out u soon!"
                    })
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

module.exports = userQuery;