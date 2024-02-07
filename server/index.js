const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const uri = "mongodb+srv://mustafabharmal178:mustafa@thaalisystem.jqmnlib.mongodb.net/?retryWrites=true&w=majority";
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
