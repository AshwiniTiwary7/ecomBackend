const user = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
    try {
        const { userEmail, userPass } = req.body;
        if (!userEmail || !userPass) {
            res.status(401).json({
                message: "All fields are neccessary"
            })
        }
        else {
            const userExistOrNot = await user.findOne({ userEmail: userEmail});
            if (!userExistOrNot) {
                res.status(404).json({
                    message: "Please Register before Login in"
                })
            }
            else {
                try {
                    if (await bcrypt.compare(userPass, userExistOrNot.userPass)) {
                        const token = await jwt.sign({
                            userId: userExistOrNot._id
                        }, process.env.SECRET);
                        res.status(200).json({
                            message: "Logged In Successfully",
                            userId:userExistOrNot._id,
                            userToken: token
                        })
                    }
                    else {
                        res.status(401).json({
                            message: "Invalid Password"
                        })
                    }
                } catch (error) {
                    res.status(400).json({
                        message: "Error while creating your Personal Token!"
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

module.exports = loginUser;