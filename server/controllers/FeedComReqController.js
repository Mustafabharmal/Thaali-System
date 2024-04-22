
const axios = require('axios');
const { get } = require('mongoose');
const { head, param } = require('../routes/userRoutes');

const API_URL = 'http://localhost:8080'; // Replace with your Java API URL

const feedComReqController = {
    getFeedComReqs: async (req, res) => {
        try {
            console.log(req.headers.type);
            console.log(req.isAdmin);
            console.log(req.isManager);
            console.log(req.isUser);
            console.log(req.userId);
            let params = {
                communityid: req.communityid,
                // role: user.role
                userid: req.userId,
                type: req.headers.type,
                isAdmin: req.isAdmin,
                isManager: req.isManager,
                isUser: req.isUser,
                
                // role:req.headers.role
            };
            const response = await axios.get(`${API_URL}/feedback/`,{params
            }); 
            console.log(response.data)
            console.log(req.headers.type);
            console.log(req.isAdmin);
            console.log(req.isManager);
            console.log(req.isUser);
            console.log(req.userId);
            res.status(200).json(response.data);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },
    addFeedComReq: async (req, res) => {
        try {
            const formData = req.body;

            // Modify form data as needed
            formData.status = 1;
            formData.createdat = Date.now();
            formData.updatedat = Date.now();
            formData.userid = req.userId;
            formData.type=req.headers.type;
            console.log(formData.type);
            formData.role=req.headers.role;
            // const newUser = new User(formData);
            const response = await axios.post(`${API_URL}/feedback/add`, formData, {
                headers: {
                    'type': req.headers.type,
                    'isAdmin': req.isAdmin,
                    'isManager': req.isManager,
                    'isUser': req.isUser,
                    'userId': req.userId,
                    'communityid': req.communityid,
                    'Content-Type': 'application/json',
                },
            });
           
            res.status(201).json(response.data);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },
    editFeedComReq: async (req, res) => {
        try {
            
            const feedComReqId = req.params.id;
            const formData = req.body;
            formData.role=req.headers.role;
            formData.type=req.headers.type;
            formData.updatedat = Date.now();
            console.log(formData.createdat);
            const response = await axios.put(`${API_URL}/feedback/update/${feedComReqId}`, formData, {
                headers: {
                    'type': req.headers.type,
                    'isAdmin': req.isAdmin,
                    'isManager': req.isManager,
                    'isUser': req.isUser,
                    'userId': req.userId,
                    'communityid': req.communityid,
                    'Content-Type': 'application/json',
                },
            });
            res.status(200).json(response.data);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteFeedComReq: async (req, res) => {
        try {
            const feedComReqId = req.params.id;
            const response = await axios.put(`${API_URL}/feedback/delete/${feedComReqId}`, {
                headers: {
                    'type': req.headers.type,
                    'isAdmin': req.isAdmin,
                    'isManager': req.isManager,
                    'isUser': req.isUser,
                    'userId': req.userId,
                    'communityid': req.communityid,
                    'Content-Type': 'application/json',
                },
            });
            res.status(200).json(response.data);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    },
    // dashboardFeedComReq: async (req, res) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/feedback/dashboard`, {
    //             headers: {
    //                 'type': req.headers.type,
    //                 'isAdmin': req.isAdmin,
    //                 'isManager': req.isManager,
    //                 'isUser': req.isUser,
    //                 'userId': req.userId,
    //                 'communityid': req.communityid,
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         res.status(200).json(response.data);
    //     } catch (err) {
    //         console.error('Error:', err);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }


};
module.exports = feedComReqController;