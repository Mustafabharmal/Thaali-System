// const { ObjectId } = require("mongodb");
const User = require("../models/user");
const db = require("../config/db");
const { ObjectId } = require("bson");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const userController = {
    getAllUsers: async (req, res) => {
        if (!req.isAdmin && !req.isManager) {
            return res
                .status(403)
                .json({ error: "You are not an admin OR MANAGER" });
        }
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            let documents;

            if (req.isAdmin) {
                documents = await collection.find({ status: 1 }).toArray();
            } else if (req.isManager) {
                documents = await collection.find({ status: 1 }).toArray();
                documents = documents.filter(
                    (user) => user.communityid === req.communityid
                );
            }

            res.status(200).json(documents);
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    },

    addUser: async (req, res) => {
        if (!req.isAdmin && !req.isManager) {
            return res.status(403).json({ error: "You are not an admin or manager" });
        }
        try {
            const formData = req.body;
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");

            // Check if user with the same email already exists
            const existingUser = await collection.findOne({ email: formData.email });
            if (existingUser) {
                return res.status(400).json({ error: "User with this email already exists" });
            }

            if (req.isManager) {
                formData.communityid = req.communityid;
            }
            const passtoStore= formData.password;
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            formData.password = hashedPassword;

            const newUser = new User(formData);
            
            const result = await collection.insertOne(newUser);
            if (result) {
                // Send email to the newly created user
                const transporter = nodemailer.createTransport({
                    // Configure your email provider here
                    // Example for Gmail:
                    service: 'gmail',
                    auth: {
                        user: 'thaalicenter@gmail.com',
                        pass: 'inbr aswm ywiy tjfb'
                    }
                });

                const mailOptions = {
                    from: 'thaalicenter@gmail.com',
                    to: formData.email,
                    subject: 'Welcome to ThaliSystem',
                    text: `Hello ${formData.name},\n\nYour account has been successfully created.\n\nUsername: ${formData.email}\nPassword: ${passtoStore}\n\nThank you for joining ThaliSystem.`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                    } else {
                        console.log("Email sent:", info.response);
                    }
                });

                res.status(201).json({ message: "User created successfully" });
            } else {
                res.status(500).json({ error: "Failed to create user" });
            }
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    
updateUser: async (req, res) => {
    if (!req.isAdmin && !req.isManager) {
        return res.status(403).json({ error: "You are not an admin or manager" });
    }
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
        await db.connect();
        const collection = db.db("ThaliSystem").collection("users");
        const updatedUserWithoutId = { ...updatedUser };
        delete updatedUserWithoutId._id;

        // Check if user with the same email already exists
        const existingUser = await collection.findOne({ email: updatedUser.email, _id: { $ne: userId } });
        if (existingUser) {
            return res.status(400).json({ error: "Another user with this email already exists" });
        }
        // const passtoStore= updatedUser.password;
        // const hashedPassword = await bcrypt.hash(formData.password, 10);
        // formData.password = hashedPassword;
        // Check if email field is updated
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        if (user.email !== updatedUser.email) {
            // Email is updated, send notification to the user
            const transporter = nodemailer.createTransport({
                // Configure your email provider here
                // Example for Gmail:
                service: 'gmail',
                auth: {
                    user: 'thaalicenter@gmail.com',
                    pass: 'inbr aswm ywiy tjfb'
                }
            });

            const mailOptions = {
                from: 'thaalicenter@gmail.com',
                to: user.email,
                subject: 'Email Address Updated on ThaaliSystem',
                text: `Hello ${user.name},\n\nYour email address has been updated to ${updatedUser.email}.\n\nIf you did not make this change, please contact support immediately.\n\nThank you,\nThaali System.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });
        }

        if (req.isManager) {
            updatedUserWithoutId.communityid = req.communityid;
        }
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedUserWithoutId }
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
},
    updateUserStatus: async (req, res) => {
        if (!req.isAdmin && !req.isManager) {
            return res
                .status(403)
                .json({ error: "You are not an admin OR MANAGER" });
        }
        const userId = req.params.id;
        const newStatus = req.body.status;
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const result = await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { status: newStatus } }
            );
            if (result.matchedCount > 0) {
                res.status(200).json({
                    message: "User status updated successfully",
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error updating user status:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};

module.exports = userController;
