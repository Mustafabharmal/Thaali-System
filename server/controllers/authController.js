const User = require("../models/user");
const db = require("../config/db");
const { ObjectId } = require("bson");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
// const { createTokenUser, attachCookiesToResponse } = require("../utils")
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, "trial", { expiresIn: "1h" });
    res.status(statusCode).json({
        success: true,
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        communityid: user.communityid,
        thaaliuser: user.thaaliuser,
        headcount: user.headcount,
        phoneno: user.phoneno,
        address: user.address,
        token,
    });
};
const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const status = 1;
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            // console.log(email, password)
            const user = await collection.findOne({ email, password, status });
            if (user) {
                // Set cookie upon successful login
                //    const tokenUser = createTokenUser(user)
                //    attachCookiesToResponse({ res, user: tokenUser })
                //    res.status(StatusCodes.OK).json({ user: tokenUser, msg: "Login successful!" })
                // Cookie expires in 24 hours
                //    res.status(200).json({ message: "Login successful" });
                // res.status(200).json({ user: tokenUser, msg: "Login successful!" })
                console.log(user);
                sendToken(user, 201, res);

                // res.status(200).json({ message: "Login successful" });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    },
    
forgetPassword: async (req, res) => {
    try {
        const  {email}  = req.body;
        await db.connect();
        const collection = db.db("ThaliSystem").collection("users");
        const user = await collection.findOne({ email });

        if (user) {
            // Generate a random password string of 15 characters
            const newPassword = "thaali" + Math.random().toString(36).slice(2, 17); // Generate random characters after "thaali"

            // Hash the new password
            // const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password in the database
            await collection.updateOne({ email }, { $set: { password: newPassword } });

            // Send email to the user with the new password
            const transporter = nodemailer.createTransport({
                // Configure your email provider here
                // Example for Gmail:
                service: 'gmail',
                auth: {
                    user: 'mustafa.bharmal114768@marwadiuniversity.ac.in',
                    pass: 'rtgi cfde fuat tjpu'
                }
            });

            const mailOptions = {
                from: 'mustafa.bharmal114768@marwadiuniversity.ac.in',
                to: email,
                subject: 'Password Reset on ThaaliSystem',
                text: `Hello,\n\nYour password has been reset. Your new password is: ${newPassword}\n\nPlease login with this password and consider changing it after logging in.\n\nThank you,\nThaali System.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });

            res.status(200).json({ message: "Email sent with new password" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
},
    logout: async (req, res) => {
        try {
            // res.clearCookie('user_id');
            res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    },
};
module.exports = authController;
