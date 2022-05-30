const express = require("express");
const router = express.Router();
const auth = require("../auth");

const User = require("../model/User");
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Playlist = require("../model/Playlist");
const crypto = require('crypto');
const path = require('path');

const mongoURI = "mongodb://localhost:27017/uploads";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
/**
 * @method - POST
 * @description - Like
 * @param - /collections/like
 */
router.post("/like", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const { songID } = req.body;
    if(songID==null){
      return res.status(400).json({
        message: "Please Enter Song ID"
      });
    }
    let song = await gfs.files.findOne({_id:songID});
    if (!song)
      return res.status(400).json({
        message: "Song Does Not Exist"
      });
    if(!user.likes.includes(songID)) {
      user.likes.push(songID);
    }
    else{
      user.likes.remove(songID);
    }
    await user.save(); //this might report unresolved but it lies
    res.json(user);
  } catch (e) {
    res.send({ message: e});
  }
});

/**
 * @method - POST
 * @description - follow
 * @param - /collections/follow
 */

router.post("/follow", auth, async (req, res) => {
  try {
    const { artistName } = req.body;
    if(artistName==null){
      return res.status(400).json({
        message: "Please Enter Artist Name"
      });
    }
    let artist = await User.findOne({
      "username":artistName
    });
    if (!artist)
      return res.status(400).json({
        message: "Artist Does Not Exist"
      });
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);

    if(!user.following.includes(artistName)) {
      user.following.push(artistName);
    }
    else{
      user.following.remove(artistName);
    }
    await user.save(); //this might report unresolved but it lies
    res.json(user);
  } catch (e) {
    res.send({ message: e});
  }
});


/**
 * @method - POST
 * @description - create playlist
 * @param - /collections/createPlaylist
 */

router.post("/createPlaylist", auth, async (req, res) => {
  try {
    const {title}=req.body;
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(400).json({
        message: "Couldn't find user account"
      });
    let ID;
    crypto.randomBytes(16, async (err, buf) => {
      if (err) {
        res.send({ message: err})
      }
       ID = buf.toString('hex');
      let playlist = new Playlist({
        title:title,
        pID:ID
      });


      await playlist.save();
      user.playlistIDs.push(ID);
      await user.save();
      res.json(playlist);
    });
  } catch (e) {
    res.send({ message: e});
  }
});

/**
 * @method - POST
 * @description - add song to playlist
 * @param - /collections/playlist/addsong
 */

router.post("/playlist/addsong", auth, async (req, res) => {
  try {
    const {songID,playlistID}=req.body;
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(400).json({
        message: "Couldn't find user account"
      });
    const playlist = await Playlist.findOne({pID:playlistID});
    if (!user)
      return res.status(400).json({
        message: "Couldn't find playlist"
      });
    if(!playlist.songs.includes(songID)) {
      playlist.songs.push(songID);


      await playlist.save();
    }

    res.json(playlist);
  } catch (e) {
    res.send({ message: e});
  }
});


/**
 * @method - POST
 * @description - add song to playlist
 * @param - /collections/playlist/removesong
 */

router.post("/playlist/removesong", auth, async (req, res) => {
  try {
    const {songID,playlistID}=req.body;
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(400).json({
        message: "Couldn't find user account"
      });
    const playlist = await Playlist.findOne({pID:playlistID});
    if (!user)
      return res.status(400).json({
        message: "Couldn't find playlist"
      });
    if(playlist.songs.includes(songID)) {
      playlist.songs.remove(songID);
      await playlist.save();
    }

    res.json(playlist);
  } catch (e) {
    res.send({ message: e});
  }
});

module.exports = router;