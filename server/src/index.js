const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const { Audd } = require('audd.io');
const audd = new Audd('bb643879afce71f0cac3bc9aeb844c11');//hard coded throw away key will expire May 28th
const fs = require('fs');

const app = express();
//using ejs to test (replaced by react front end)
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.set('views', './src/views'); //set to ./views for docker, ./src/views for dev


//MongoURI
//set to mongo for docker use, localhost for dev
const mongoURI = 'mongodb://localhost:27017/uploads';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// @route GET /
// @desc Loads form
app.get('/', (req,res)=>{
  res.render('index');
});

// @route POST /
// @desc Uploads file to db
app.post('/upload', upload.single('file'), (req,res)=>{
  res.json({file: req.file});
});

if (!fs.existsSync('./tmp/data/musicSearch/')){
  fs.mkdirSync('./tmp/data/musicSearch/', { recursive: true });
}
// @route POST /
// @desc Uploads file to db
app.post('/getSong', multer({ dest: './tmp/data/musicSearch/' }).single('file'), (req,res)=>{


  audd.recognize.fromFile('./tmp/data/musicSearch/'+req.file.filename).then((response) => {
    const result = response.result;
    if (result){ console.log(`That song is ${result.title} by ${result.artist}`);
      res.json({"song":'That song is '+result.title.toString()+' by '+result.artist.toString()});}
    else console.log('Unable to match that song :(');
  }, console.log);
  fs.unlinkSync('./tmp/data/musicSearch/'+req.file.filename);
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route GET /audio/:filename
// @desc Display Audio File
app.get('/audio/:filename', (req, res) => {
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

const port =5000;

app.listen(port, ()=> console.log('Server started on port: '+port.toString()));

