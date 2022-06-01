const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Comment = require('../model/comment');
const User = require("../model/user");
const mongoose = require('mongoose');




/**
 * @method - POST
 * @description - Comment on a song
 * @param - /comment/song
 */
router.post("/song", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const {songID,comment}=req.body;
    if(comment==null || comment==""){
      return res.status(400).json({
        message: "Please Enter Comment"
      });
    }
    if(songID==null){
      return res.status(400).json({
        message: "Please Enter Song ID"
      });
    }
    let comments = await Comment.findOne({songID});
    if (!comments)
      return res.status(400).json({
        message: "Comment Section Does Not Exist"
      });

    let username = user.username;
    comments.comments.push({
      username,
      comment
    });

    await comments.save();
    res.json(user);
  } catch (e) {
    res.send({ message: e});
  }
});

/**
 * @method - POST
 * @description - get Comment on a song
 * @param - /comment/get
 */
router.post("/get", async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication

    const {songID}=req.body;
    if(songID==null){
      return res.status(400).json({
        message: "Please Enter Song ID"
      });
    }
    let comments = await Comment.findOne({songID});
    if (!comments)
      return res.status(400).json({
        message: "Comment Section Does Not Exist"
      });
    res.json(comments);
  } catch (e) {
    res.send({ message: e});
  }
});



module.exports = router;