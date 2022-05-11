/*
const express = require('express');

const app = express();
const port = 420;

app.get('/', (req, res) => {
  console.log('Received get request!');
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
 */

const { MongoClient } = require("mongodb");
// Connection URI
const uri =
    "mongodb://mongo:27017/";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
