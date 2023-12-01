const jwt = require('jsonwebtoken');
require('dotenv').config();

async function userLoggedIn(req, res, next) {
    try {
        if (!req.headers.authorization) {
            res.status(404).json({
                message: "Please Add Token!"
            })
        }
        else {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                res.status(401).json({
                    message: "No Token Found! Login Again"
                })
            }
            else {
                try {
                    const tokenDecode = jwt.verify(token, process.env.SECRET);
                    if (!tokenDecode) {
                        res.status(401).json({
                            message: "You need to login first"
                        })
                    }
                    else {
                        req.useId = tokenDecode.userId;
                        next();
                    }
                } catch (error) {
                    res.status(401).json({
                        message: "You need to login first"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry!There was an error while validating Token"
        })
    }
}

module.exports = userLoggedIn;