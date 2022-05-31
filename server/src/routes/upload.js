const express = require("express");
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const auth = require("../auth");
const User = require('../model/user');
const Comment = require('../model/comment');

const mongoURI = "mongodb://mongo:27017/uploads";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

let updatedMetadata;

const updateMetadata = (id,name,sn) => {
  updatedMetadata= {
    artist: id,
    songName: name,
    searchName:sn,
  }
};

//Johannes Fahrenkrug
//https://stackoverflow.com/questions/44833817/mongodb-full-and-partial-text-search
function createEdgeNGrams(str) {
  if (str && str.length > 3) {
    const minGram = 3
    const maxGram = str.length

    return str.split(" ").reduce((ngrams, token) => {
      if (token.length > minGram) {
        for (let i = minGram; i <= maxGram && i <= token.length; ++i) {
          ngrams = [...ngrams, token.substr(0, i)];
        }
      } else {
        ngrams = [...ngrams, token];
      }
      return ngrams;
    }, []).join(" ")
  }

  return str;
}

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, async (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const user = await User.findById(req.user.id);
        updateMetadata(user.username, req.body.songName,createEdgeNGrams(req.body.songName)+" "+createEdgeNGrams(user.username));
        const fn= buf.toString('hex');
        let comments=new Comment({
          songID:fn

      });
        await comments.save();
        user.uploadedSongs.push(fn);
        await user.save();
        const fileInfo = {
          id:buf.toString('hex'),
          filename: filename,
          bucketName: 'uploads',
          metadata: updatedMetadata ? updatedMetadata : null
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage});



// @route POST /
// @desc Uploads file to db
router.post('/', auth , upload.single('file'), async (req,res)=>{
  res.json({file: req.file});
});

// @route GET /audio/:filename
// @desc Display Audio File
router.get('/audio/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'audio/mpeg') {
      // Read output to browser

      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);

    } else {
      res.status(404).json({
        err: 'Not an mp3'
      });
    }
  });
});


// @route GET /audio/:filename
// @desc Display Audio File
router.get('/song', async (req, res) => {
  try {
    const {songID} = req.body
    if(songID==null){
      return res.status(400).json({
        message: "Please Enter Song ID"
      });
    }
    // request.user is getting fetched from Middleware after token authentication
    let song = await gfs.files.findOne({_id:songID});
    res.json(song);
  } catch (e) {
    res.send({message: "Error in Fetching user"});
  }});

  module.exports = router;
