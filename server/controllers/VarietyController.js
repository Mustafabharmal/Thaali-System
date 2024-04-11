const Variet = require('../models/varietyModel');
const db = require('../config/db');
const { ObjectId } = require("bson");

const varietController = {
    getVariets: async (req, res) => {
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("variety");
            const documents = await collection.find({ status: 1 }).toArray();
            res.status(200).json(documents);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },

    addVariet: async (req, res) => {
        try {
            const formData = req.body;
            await db.connect();
            const collection = db.db('ThaliSystem').collection('variety');
            const newVariet = new Variet(formData);
            const result = await collection.insertOne(newVariet);
            console.log(formData)
            if (result) {
                res.status(201).json({ message: 'Variet created successfully' });
            } else {
                res.status(500).json({ error: 'Failed to create variet' });
            }
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateVariet: async (req, res) => {
        const varietId = req.params.id;
        const updatedVariet = req.body;
        try {
            await db.connect();
            const collection = db.db("ThaliSystem").collection("variety");
            const updatedVarietWithoutId = { ...updatedVariet };
            delete updatedVarietWithoutId._id;
            const result = await collection.updateOne({ _id: new ObjectId(varietId) }, { $set: updatedVarietWithoutId });
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: "Variet updated successfully" });
            } else {
                res.status(404).json({ message: "Variet not found" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteVariet: async (req, res) => {
        const varietId = req.params.id;
        const newStatus = req.body.status;
        try {
            await db.connect();
            const collection = db.db('ThaliSystem').collection('variety');
            const result = await collection.updateOne(
                { _id: new ObjectId(varietId) },
                { $set: { status: newStatus } }
            );
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Variet status updated successfully' });
            } else {
                res.status(404).json({ message: 'Variet not found' });
            }
        } catch (error) {
            console.error('Error updating variet status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = varietController;
