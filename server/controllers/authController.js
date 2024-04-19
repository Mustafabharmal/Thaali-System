const User = require("../models/user");
const db = require("../config/db");
const { ObjectId } = require("bson");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
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
            const user = await collection.findOne({ email, status });

            if (user) {
                // Compare the provided password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    console.log(user);
                    sendToken(user, 201, res);
                    // res.status(200).json({ message: "Login successful" });
                } else {
                    res.status(401).json({ message: "Invalid email or password" });
                }
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
            const { email } = req.body;
            // console.log(email)
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const user = await collection.findOne({ email });
            // console.log(user)
            if (user) {
                // Generate a random password
                const newPassword = "thaali" + Math.random().toString(36).slice(2, 17); // Generate random characters after "thaali"

                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPassword, 10);

                // Update user's password in the database with the hashed password
                await collection.updateOne(
                    { email },
                    { $set: { password: hashedPassword } }
                );

                // Send email to the user with the new password
                const transporter = nodemailer.createTransport({
                    // Configure your email provider here
                    // Example for Gmail:
                    service: "gmail",
                    auth: {
                        user: "mustafa.bharmal114768@marwadiuniversity.ac.in",
                        pass: "rtgi cfde fuat tjpu",
                    },
                });

                const mailOptions = {
                    from: "mustafa.bharmal114768@marwadiuniversity.ac.in",
                    to: email,
                    subject: "Password Reset on ThaaliSystem",
                    text: `Hello,\n\nYour password has been reset. \n\nYour new password is: ${newPassword}\n\nPlease login with this password and consider changing it after logging in.\n\nThank you,\nThaali System.`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                    } else {
                        console.log("Email sent:", info.response);
                    }
                });

                res.status(200).json({
                    message: "Email sent with new password",
                });
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
    UpdatePassword: async (req, res) => {
        try {
            const { email, oldPassword, newPassword } = req.body;
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const user = await collection.findOne({ email });

            if (user) {
                // Compare the provided old password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(oldPassword, user.password);

                if (passwordMatch) {
                    // Hash the new password
                    const hashedPassword = await bcrypt.hash(newPassword, 10);

                    // Update user's password in the database with the hashed password
                    await collection.updateOne(
                        { email },
                        { $set: { password: hashedPassword } }
                    );

                    res.status(200).json({
                        message: "Password updated successfully",
                    });
                } else {
                    res.status(401).json({ message: "Incorrect old password" });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    },
};
module.exports = authController;
