require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');



module.exports = {
    // User-Registration
    registeringNewUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            const searchUser = await UserModel.find({ email });
            if (searchUser.length >= 1) {
                res.status(409).send({
                    status: false,
                    msg: "User's Email-ID Already Exists."
                })
            } else {
                bcrypt.hash(password, 6, async (err, hash) => {
                    if (hash) {
                        const user = new UserModel({ name, email, password: hash, role });
                        await user.save();
                        res.status(200).send({
                            status: true,
                            msg: "You have successfully Registered."
                        })
                    } else {
                        res.status(500).send({
                            status: false,
                            msg: "Error in hashing the password."
                        })
                    }
                })
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in the Registration of the new user."
            })
        }
    },


    //User-Login
    loggingUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const loggedUser = await UserModel.find({ email });
            if (loggedUser.length == 1) {
                bcrypt.compare(password, loggedUser[0].password, async (err, result) => {
                    if (result) {
                        const token = jwt.sign({ "user-id": loggedUser[0]._id }, process.env.secret_key, { expiresIn: "7d" })
                        res.status(200).send({
                            status: true,
                            msg: "Logged In Successfully!",
                            token: token,
                            data: loggedUser[0]
                        })
                    } else {
                        res.status(401).send({
                            status: false,
                            msg: "Wrong Credentials!"
                        })
                    }
                })
            } else {
                res.status(404).send({
                    status: false,
                    msg: "Please Enter Correct Email-ID."
                })
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in Logging In..Please try Again!!"
            })
        }
    },


    //Forgot Password/Reset Password
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.find({ email });
            if (user.length == 1) {
                const updatedPassword = bcrypt.hashSync(password, 6);
                await UserModel.updateOne({ _id: user[0]._id }, { $set: { password: updatedPassword } });
                res.status(200).send({
                    status: true,
                    msg: "Password Successfully Updated!!"
                })
            } else {
                res.status(404).send({
                    status: false,
                    msg: "Incorrect Email-ID.."
                })
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in Updating the Password!"
            })
        }
    }
}