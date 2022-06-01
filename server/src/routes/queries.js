const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const express = require("express");
const router = express.Router();

const fs = require('fs');
const multer = require('multer');
const Comment = require('../model/comment');
const Playlist = require('../model/playlist');
var request = require('request');

const mongoURI = "mongodb://mongo:27017/uploads";

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

let getSong= async function (search) {
  const query = {$text: {$search: search}};
  const cursor = await gfs.files.find(query).sort(sort).project(projection);
  const vals = await cursor.toArray();
  return vals;
}//


/**
 * @method - GET
 * @description - search for song by name
 * @param - /search/song
 */
router.post("/song", async (req, res) => {
  try {
    const vals=await getSong(req.body.songName); //full text search abstracted to function
    res.json(vals);

     //full search

  } catch (e) {
    res.send({ message: e});
  }
});

if (!fs.existsSync('./tmp/data/musicSearch/')){
  fs.mkdirSync('./tmp/data/musicSearch/', { recursive: true });
}
/*
// @route POST /
// @desc Search for song name
router.post('/audioSearch', multer({ dest: './tmp/data/musicSearch/' }).single('file'), (req,res)=>{

  audd.recognize.fromFile('./tmp/data/musicSearch/'+req.file.filename).then((response) => {
    const result = response.result;
    if (result){ console.log(`That song is ${result.title} by ${result.artist}`);
      res.json({"song":'That song is '+result.title.toString()+' by '+result.artist.toString()});}
    else console.log('Unable to match that song :(');
  }, console.log);
  fs.unlinkSync('./tmp/data/musicSearch/'+req.file.filename);
});
*/
// @route POST /
// @desc Search songs in db by name
router.post('/findByAudio', multer({ dest: './tmp/data/musicSearch/' }).single('file'), async (req, res) => {
  const requestOptions = {
    method: 'POST',
    url:'https://api.audd.io/',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    formData:{
      "api_token":"67a06f1ccbcb9941ed4602d0690e3e18",
      file:fs.createReadStream('./tmp/data/musicSearch/' + req.file.filename)
    }
  };
  request(requestOptions, function (err, re, body) {
    if(err) console.log(err);
    console.log(body)
    res.json(re)
  });
  //fs.unlinkSync('./tmp/data/musicSearch/' + req.file.filename);
});
/**
 * @method - GET
 * @description - get songs in a playlist
 * @param - /search/playlist
 */
router.post("/playlist", async (req, res) => {
  try {
    const playlist=await Playlist.findOne({pID:req.body.playlistID})
    res.json(playlist);

    //full search

  } catch (e) {
    res.send({ message: e});
  }
});

module.exports = router;