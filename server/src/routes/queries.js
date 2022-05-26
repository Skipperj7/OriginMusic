const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const express = require("express");
const router = express.Router();

const mongoURI = "mongodb://localhost:27017/uploads";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

const sort = { score: { $meta: "textScore" } };
// Return only the `title` of each matched document
const projection = {
  songName:1,
  score: { $meta: "textScore" },
};

conn.once('open', async () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  await gfs.collection('uploads');
  gfs.files.createIndex({"metadata.searchName": "text"});
//full search//

});

/**
 * @method - GET
 * @description - search for song by name
 * @param - /search/song
 */
const util = require('util');
router.get("/song", async (req, res) => {
  try {

    const query = { $text: { $search: req.body.songName} };
    const cursor = await gfs.files.find(query).sort(sort).project(projection);
    const vals=await cursor.toArray();
    res.json(vals);

     //full search

  } catch (e) {
    res.send({ message: e});
  }
});


module.exports = router;