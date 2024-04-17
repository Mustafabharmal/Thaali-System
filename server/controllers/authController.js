const User = require('../models/user');
const db = require('../config/db');
const { ObjectId } = require("bson");
const cookieParser = require('cookie-parser');
const { createTokenUser, attachCookiesToResponse } = require("../utils")

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const user = await collection.findOne({ email, password });
            if (user) {
                       // Set cookie upon successful login
                       const tokenUser = createTokenUser(user)
                       attachCookiesToResponse({ res, user: tokenUser })
                    //    res.status(StatusCodes.OK).json({ user: tokenUser, msg: "Login successful!" })
                      // Cookie expires in 24 hours
                    //    res.status(200).json({ message: "Login successful" });
                    res.status(200).json({ user: tokenUser, msg: "Login successful!" })

                // res.status(200).json({ message: "Login successful" });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('user_id');
            res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    }
};
module.exports = authController;
