// const { ObjectId } = require("mongodb");
const User = require("../models/user");
const db = require("../config/db");
const { ObjectId } = require("bson");
const userController = {
    getData: async (req, res) => {
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            let documents;
    
            if (!req.isAdmin && !req.isManager && !req.isUser) {
                return res.status(403).json({ error: "You are not an admin or manager" });
            }
    
            let userCount = 0;
            let communityCount = 0;
            let varietyCount = 0;
            let menuCount = 0;
            const varietyCollection = db.db("ThaliSystem").collection("variety");
            const menuCollection = db.db("ThaliSystem").collection("menu");
            const communitiesCollection = db.db("ThaliSystem").collection("community");
            if (req.isAdmin) {
                // Get user count
                userCount = await collection.countDocuments({ status: 1 });
    
                // Get community count
               
                communityCount = await communitiesCollection.countDocuments({ status: 1 });
                menuCount = await menuCollection.countDocuments({ status: 1 });
                varietyCount = await varietyCollection.countDocuments({ status: 1 });
            } else if (req.isManager) {
                // Get user count for particular community id
                userCount = await collection.countDocuments({ status: 1, communityid: req.communityid });
                menuCount = await menuCollection.countDocuments({ status: 1, communityid: req.communityid });
                varietyCount = await varietyCollection.countDocuments({ status: 1, communityid: req.communityid });
            }
            let communityName = await communitiesCollection.findOne({ _id: new ObjectId(req.communityid), status:1 });
            // console.log(communityName.name);
            communityName = communityName.name;
            // Get variety count
            
            // varietyCount = await varietyCollection.countDocuments();
    
            // Get menu count
            // const menuCollection = db.db("ThaliSystem").collection("menu");
            // menuCount = await menuCollection.countDocuments();
    
            res.status(200).json(
                {
                    userCount,
                    communityCount,
                    varietyCount,
                    menuCount,
                    communityName
                }
            );
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    },
    updateMe: async (req, res) => {
        if (!req.isAdmin && !req.isManager && !req.isUser) {
            return res.status(403).json({ error: "You are not an admin, manager, or user" });
        }
        const userId = req.userId;
        const updatedUser = req.body;
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("users");
            const updatedUserWithoutId = { ...updatedUser };
            delete updatedUserWithoutId._id;
            
            // Check if user with the same email already exists
            const existingUser = await collection.findOne({ email: updatedUser.email, _id: { $ne:  new ObjectId(userId) } });
            if (existingUser) {
                return res.status(400).json({ error: "Another user with this email already exists" });
            }
    
            if (req.isManager) {
                updatedUserWithoutId.communityid = req.communityid;
            }
            const result = await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: updatedUserWithoutId }
            );
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: "User updated successfully", user: result });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
    
    // addUser: async (req, res) => {
    //     if (!req.isAdmin && !req.isManager) {
    //         return res
    //             .status(403)
    //             .json({ error: "You are not an admin OR MANAGER" });
    //     }
    //     try {
    //         const formData = req.body;
    //         await db.connect();
    //         const collection = db.db("ThaliSystem").collection("users");
    //         if (req.isManager) {
    //             formData.communityid = req.communityid;
    //         }
    //         const newUser = new User(formData);
    //         const result = await collection.insertOne(newUser);
    //         if (result) {
    //             res.status(201).json({ message: "User created successfully" });
    //         } else {
    //             res.status(500).json({ error: "Failed to create user" });
    //         }
    //     } catch (err) {
    //         console.error("Error:", err);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // },

    // updateUser: async (req, res) => {
    //     if (!req.isAdmin && !req.isManager) {
    //         return res
    //             .status(403)
    //             .json({ error: "You are not an admin OR MANAGER" });
    //     }
    //     const userId = req.params.id;
    //     const updatedUser = req.body;
    //     try {
    //         await db.connect();
    //         const collection = db.db("ThaliSystem").collection("users");
    //         const updatedUserWithoutId = { ...updatedUser };
    //         delete updatedUserWithoutId._id;
    //         if (req.isManager) {
    //             updatedUserWithoutId.communityid = req.communityid;
    //         }
    //         const result = await collection.updateOne(
    //             { _id: new ObjectId(userId) },
    //             { $set: updatedUserWithoutId }
    //         );
    //         if (result.modifiedCount === 1) {
    //             res.status(200).json({ message: "User updated successfully" });
    //         } else {
    //             res.status(404).json({ message: "User not found" });
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // },

    // updateUserStatus: async (req, res) => {
    //     if (!req.isAdmin && !req.isManager) {
    //         return res
    //             .status(403)
    //             .json({ error: "You are not an admin OR MANAGER" });
    //     }
    //     const userId = req.params.id;
    //     const newStatus = req.body.status;
    //     try {
    //         await db.connect();
    //         const collection = db.db("ThaliSystem").collection("users");
    //         const result = await collection.updateOne(
    //             { _id: new ObjectId(userId) },
    //             { $set: { status: newStatus } }
    //         );
    //         if (result.matchedCount > 0) {
    //             res.status(200).json({
    //                 message: "User status updated successfully",
    //             });
    //         } else {
    //             res.status(404).json({ message: "User not found" });
    //         }
    //     } catch (error) {
    //         console.error("Error updating user status:", error);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // },
};

module.exports = userController;
