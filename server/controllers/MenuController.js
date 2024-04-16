const Menu = require('../models/MenuModel');
const db = require('../config/db');
const { ObjectId } = require("bson");

const menuController = {
    getMenus: async (req, res) => {
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("menu");
            const documents = await collection.find({ status: 1 }).toArray();
            res.status(200).json(documents);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },

    addMenu: async (req, res) => {
        try {
            const formData = req.body;
            await db.connect();
            const collection = db.db('ThaliSystem').collection('menu');
            const newMenu = new Menu(formData);
            const result = await collection.insertOne(newMenu);
            if (result) {
                res.status(201).json({ message: 'Menu created successfully' });
            } else {
                res.status(500).json({ error: 'Failed to create menu' });
            }
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateMenu: async (req, res) => {
        const menuId = req.params.id;
        const updatedMenu = req.body;
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("menu");
            const updatedMenuWithoutId = { ...updatedMenu };
            delete updatedMenuWithoutId._id;
            const result = await collection.updateOne({ _id: new ObjectId(menuId) }, { $set: updatedMenuWithoutId });
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: "Menu updated successfully" });
            } else {
                res.status(404).json({ message: "Menu not found" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteMenu: async (req, res) => {
        const menuId = req.params.id;
        const newStatus = req.body.status;
        try {
            await db.connect();
            const collection = db.db('ThaliSystem').collection('menu');
            const result = await collection.updateOne(
                { _id: new ObjectId(menuId) },
                { $set: { status: newStatus } }
            );
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Menu status updated successfully' });
            } else {
                res.status(404).json({ message: 'Menu not found' });
            }
        } catch (error) {
            console.error('Error updating menu status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = menuController;
