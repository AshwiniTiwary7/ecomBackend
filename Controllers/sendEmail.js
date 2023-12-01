const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const user = require('../Model/user');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASS,
    },
});

async function sendEmail(req, res) {
    try {
        const { userEmail } = req.params;
        if (!userEmail) {
            res.status(401).json({
                message: "Cannot Reset Password for Non exisiting user"
            })
        }
        else {
            const userFound = await user.findOne({ userEmail: userEmail });
            if (!userFound) {
                res.status(404).json({
                    message: "Cannot find the user! Enter a Email which was logged in"
                })
            }
            else {
                async function otpgen() {
                    try {
                        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets: false});
                        return otp;
                    } catch (error) {
                        res.status(501).json({
                            message: "Error while generating OTP"
                        })
                    }
                }
                const otpGenerated = await otpgen();
                await user.updateOne({userEmail:userEmail},{otp:otpGenerated});
                const mailoption = {
                    from: process.env.MY_MAIL,
                    to: userEmail,
                    subject: "Reset Password",
                    text: `Your OTP for Password Change is : ${otpGenerated}`
                }
                try {
                    const info = await transporter.sendMail(mailoption);
                    res.status(200).json({
                        message: "Email Sent"
                    })
                } catch (error) {
                    res.status(501).json({
                        message: "Error while sending mail"
                    })
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

module.exports = sendEmail;