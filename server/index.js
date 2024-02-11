const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const User = require('./user');
const connectionString = "mongodb+srv://mustafabharmal178:mustafa@thaalisystem.jqmnlib.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, { 
    // useNewUrlParser: true, useUnifiedTopology: true 
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  app.use(bodyParser.json());
app.get('/users', async (req, res) => {
    // const client = new MongoClient(uri, {
    //     // useNewUrlParser: true,
    //     // useUnifiedTopology: true,
    // });

    try {
        await client.connect();
        const collection = client.db("ThaliSystem").collection("users");
        
        const documents = await collection.find({}).toArray();

        res.status(200).json(documents);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});
app.post('/add/user', async (req, res) => {
    try {
        // Map form data to the User model
        const formData = req.body; // Access 'user' property from the request body
        console.log(formData);
    
        // const newUser = new User({
        //   name: formData.name,
        //   address: formData.address,
        //   role: formData.role,
        //   status: formData.status || 1, // Add default value for status if not provided
        //   email: formData.email,
        //   phoneNo: formData.phone,
        //   communityId: formData.community,
        //   password: formData.password,
        //   headCount: formData.headCount,
        //   units: formData.units,
        //   thaaliUser: formData.userType,
        // });
    
        // Save the user to the MongoDB collection
        // const result = await newUser.save();
        await client.connect();
        console.log('Connected to the database');
    
        // Access the database and collection
        const database = client.db('ThaliSystem'); // Replace 'your-database' with your actual database name
        const collection = database.collection('users'); // Replace 'users' with your actual collection name
    
        // Insert the form data directly into the MongoDB collection
        const result = await collection.insertOne(formData);
        if (result) {
            res.status(201).json({ message: 'User created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
