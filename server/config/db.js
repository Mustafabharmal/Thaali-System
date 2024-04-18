const { MongoClient } = require("mongodb");

const connectionString =
    "mongodb+srv://mustafabharmal178:mustafa@thaalisystem.jqmnlib.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
    // useNewUrlParser: true, useUnifiedTopology: true
});

module.exports = client;
