const user = require('../Model/user');
const bcrypt = require('bcrypt');

async function changeUserDetails(req, res) {
    try {
        const { userId } = req.params;
        const { fullName, mobile, userEmail, userPass } = req.body;
        if (!fullName || !mobile || !userEmail || !userPass) {
            res.status(502).json({
                message: "No Changes found in User Data"
            })
        }
        else {
            if (!userId) {
                res.status(404).json({
                    message: "Please Provide valid user"
                })
            }
            else {
                const findUserDetail = await user.findById({ _id: userId });
                if (!findUserDetail) {
                    res.status(404).json({
                        message: "No user found! Log in again"
                    })
                }
                else {
                    if (await bcrypt.compare(userPass, findUserDetail.userPass)) {
                        await user.findByIdAndUpdate({ _id: userId }, { fullName, mobile, userEmail });
                        res.status(200).json({
                            message: "User Details Updated Successfully"
                        })
                    }
                    else {
                        res.status(401).json({
                            message:"Details not updated! Invalid Password"
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

module.exports = changeUserDetails;