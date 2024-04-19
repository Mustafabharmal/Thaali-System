// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');
// const app = express();
// const bodyParser = require('body-parser');
// const { ObjectId } = require("bson");
// const User = require('./user');
// const connectionString = "mongodb+srv://mustafabharmal178:mustafa@thaalisystem.jqmnlib.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(connectionString, { 
//     // useNewUrlParser: true, useUnifiedTopology: true 
// });

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   }));
// app.use(bodyParser.json());
// app.get('/users', async (req, res) => {
//     // const client = new MongoClient(uri, {
//     //     // useNewUrlParser: true,
//     //     // useUnifiedTopology: true,
//     // });

//     try {
//         await client.connect();
//         const collection = client.db("ThaliSystem").collection("users");
        
//         const documents = await collection.find({ status: 1 }).toArray();

//         res.status(200).json(documents);
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('Internal Server Error');
//     } 
//     // finally {
//     //     await client.close();
//     // }
// });
// app.post('/add/user', async (req, res) => {
//     try {
//         // Map form data to the User model
//         const formData = req.body; // Access 'user' property from the request body
//         console.log(formData);
        
//         // const newUser = new User({
//         //   name: formData.name,
//         //   address: formData.address,
//         //   role: formData.role,
//         //   status: formData.status || 1, // Add default value for status if not provided
//         //   email: formData.email,
//         //   phoneNo: formData.phone,
//         //   communityId: formData.community,
//         //   password: formData.password,
//         //   headCount: formData.headCount,
//         //   units: formData.units,
//         //   thaaliUser: formData.userType,
//         // });
    
//         // Save the user to the MongoDB collection
//         // const result = await newUser.save();
//         await client.connect();
//         console.log('Connected to the database');
    
//         // Access the database and collection
//         const database = client.db('ThaliSystem'); // Replace 'your-database' with your actual database name
//         const collection = database.collection('users'); // Replace 'users' with your actual collection name
    
//         // Insert the form data directly into the MongoDB collection
//         const formDataWithoutId = { ...formData };
// delete formDataWithoutId._id;
//         const result = await collection.insertOne(formDataWithoutId);
//         if (result) {
//             res.status(201).json({ message: 'User created successfully' });
//         } else {
//             res.status(500).json({ error: 'Failed to create user' });
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// // Assuming you have a route like this in your Express app
// app.put("/update/user/:id", async (req, res) => {
//     // console.log('update user')
//     const userId = req.params.id;
//     const updatedUser = req.body;
  
//     try {
//       await client.connect();
//       const database = client.db("ThaliSystem");
//       const collection = database.collection("users");
  
//       const updatedUserWithoutId = { ...updatedUser };
//       delete updatedUserWithoutId._id; // Remove the _id field if it exists
      
//       const result = await collection.updateOne({ _id: new ObjectId(userId) }, { $set: updatedUserWithoutId });
      
//       if (result.modifiedCount === 1) {
//         res.status(200).json({ message: "User updated successfully" });
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
//   app.put('/users/delete/:id', async (req, res) => {
//     const userId = req.params.id;
//     const newStatus = req.body.status;
  
//     try {
//       await client.connect();
//       const database = client.db('ThaliSystem');
//       const collection = database.collection('users');
  
//       const result = await collection.updateOne(
//         { _id: new ObjectId(userId) },
//         { $set: { status: newStatus } }
//       );
  
//       if (result.matchedCount > 0) {
//         res.status(200).json({ message: 'User status updated successfully' });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const varietyRoutes = require('./routes/VarietyRoutes');
const MenuRoutes = require('./routes/MenuRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser('trial'));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/community', communityRoutes);
app.use('/variety', varietyRoutes);
app.use('/menu', MenuRoutes);
app.use('/dashboard', dashboardRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

