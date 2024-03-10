const Community = require('../models/communityModel');
const db = require('../config/db');
const { ObjectId } = require("bson");

const communityController = {
  getCommunities: async (req, res) => {
    try {
      await db.connect();
      const collection = db.db("ThaliSystem").collection("community");
      const documents = await collection.find({ status: 1 }).toArray();
      res.status(200).json(documents);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  },

  addCommunity: async (req, res) => {
    try {
      const formData = req.body;
      await db.connect();
      const collection = db.db('ThaliSystem').collection('community');
      const newCommunity = new Community(formData);
      const result = await collection.insertOne(newCommunity);
      if (result) {
        res.status(201).json({ message: 'Community created successfully' });
      } else {
        res.status(500).json({ error: 'Failed to create community' });
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateCommunity: async (req, res) => {
    const communityId = req.params.id;
    const updatedCommunity = req.body;
    try {
      await db.connect();
      const collection = db.db("ThaliSystem").collection("community");
      const updatedCommunityWithoutId = { ...updatedCommunity };
      delete updatedCommunityWithoutId._id;
      const result = await collection.updateOne({ _id: new ObjectId(communityId) }, { $set: updatedCommunityWithoutId });
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Community updated successfully" });
      } else {
        res.status(404).json({ message: "Community not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteCommunity: async (req, res) => {
    const communityId = req.params.id;
    const newStatus = req.body.status;
    try {
      await db.connect();
      const collection = db.db('ThaliSystem').collection('community');
      const result = await collection.updateOne(
        { _id: new ObjectId(communityId) },
        { $set: { status: newStatus } }
      );
      if (result.matchedCount > 0) {
        res.status(200).json({ message: 'Community status updated successfully' });
      } else {
        res.status(404).json({ message: 'Community not found' });
      }
    } catch (error) {
      console.error('Error updating community status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = communityController;
