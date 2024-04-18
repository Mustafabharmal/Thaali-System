// const { ObjectId } = require("mongodb");
const User = require("../models/user");
const db = require("../config/db");
const { ObjectId } = require("bson");
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
            return res
                .status(403)
                .json({ error: "You are not an admin OR MANAGER" });
        }
        try {
            const formData = req.body;
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            if (req.isManager) {
                formData.communityid = req.communityid;
            }
            const newUser = new User(formData);
            const result = await collection.insertOne(newUser);
            if (result) {
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
            return res
                .status(403)
                .json({ error: "You are not an admin OR MANAGER" });
        }
        const userId = req.params.id;
        const updatedUser = req.body;
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const updatedUserWithoutId = { ...updatedUser };
            delete updatedUserWithoutId._id;
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
