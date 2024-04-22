const User = require("../models/user");
const db = require("../config/db");
const { ObjectId } = require("bson");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
// const { createTokenUser, attachCookiesToResponse } = require("../utils")
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res, rememberMe) => {
    const tokenExpiration = rememberMe ? "7d" : "1h";
    const token = jwt.sign({ id: user._id }, "trial", {
        expiresIn: tokenExpiration,
    });
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
            const { email, password, rememberMe } = req.body;
            console.log(req.body)
            const status = 1;
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const user = await collection.findOne({ email, status });

            if (user) {
                // Compare the provided password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (passwordMatch) {
                    console.log(user);
                    sendToken(user, 201, res, rememberMe);
                    // res.status(200).json({ message: "Login successful" });
                } else {
                    res.status(401).json({
                        message: "Invalid email or password",
                    });
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
                const newPassword =
                    "thaali" + Math.random().toString(36).slice(2, 17); // Generate random characters after "thaali"

                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPassword, 10);

                // Update user's password in the database with the hashed password
                const usertemp = await collection.updateOne(
                    { email },
                    { $set: { password: hashedPassword } }
                );

                // Send email to the user with the new password
                const transporter = nodemailer.createTransport({
                    // Configure your email provider here
                    // Example for Gmail:
                    service: "gmail",
                    auth: {
                        user: "thaalicenter@gmail.com",
                        pass: "inbr aswm ywiy tjfb",
                    },
                });

                const mailOptions = {
                    from: "thaalicenter@gmail.com",
                    to: email,
                    subject: "Password Reset Notification from Thaali Center",
                    html: `
                        <p>Dear ${usertemp.name},</p>
                        <p>We hope this message finds you well.</p>
                        <p>We would like to inform you that a password reset has been initiated for your account at <strong>Thaali Center</strong>. Your security is our utmost priority, and we take all necessary measures to ensure the safety of your account.</p>
                        <p>Your new password has been set to the following:</p>
                        <p><strong>New Password:</strong> ${newPassword}</p>
                        <p>We kindly request that you log in using this new password as soon as possible. Upon logging in, we recommend changing your password to one that is both memorable and secure. This will help safeguard your account from unauthorized access.</p>
                        <p>Should you encounter any difficulties or have any questions regarding this password reset, please do not hesitate to reach out to our support team. We are here to assist you every step of the way.</p>
                        <p>Thank you for your attention to this matter.</p>
                        <p>Warm regards,</p>
                        <p>Mustafa Bharmal<br/><strong>Thaali Center</strong> Team</p>
                    `,
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
                const passwordMatch = await bcrypt.compare(
                    oldPassword,
                    user.password
                );

                if (passwordMatch) {
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
                            user: "thaalicenter@gmail.com",
                            pass: "inbr aswm ywiy tjfb",
                        },
                    });

                    const mailOptions = {
                        from: "thaalicenter@gmail.com",
                        to: email,
                        subject:
                            "Password Changed Successfully on Thaali Center",
                        html: `
                            <p>Dear ${user.name},</p>
                            <p>We hope this message finds you well.</p>
                            <p>We are writing to inform you that the password for your account at <strong>Thaali Center</strong> has been successfully changed. Your security is our top priority, and we are committed to ensuring the safety of your account at all times.</p>
                            <p>If you did not initiate this password change, please contact our support team immediately. We take such matters seriously and will investigate any unauthorized access to your account promptly.</p>
                            <p>As always, if you have any questions or concerns, please do not hesitate to reach out to our support team. We are here to assist you in any way we can.</p>
                            <p>Thank you for choosing <strong>Thaali Center</strong>.</p>
                            <p>Warm regards,</p>
                            <p>Mustafa Bharmal<br/><strong>Thaali Center</strong> Team</p>
                        `,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error("Error sending email:", error);
                        } else {
                            console.log("Email sent:", info.response);
                        }
                    });

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
