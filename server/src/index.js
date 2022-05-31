const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const methodOverride = require('method-override');
const upload = require("./routes/upload");
const collections = require("./routes/collections");
const search=require("./routes/queries");
const comment=require("./routes/comment");
const cookieParser = require("cookie-parser");
var cors = require('cors')
// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;
var corsOptions = {
  origin: ['http://localhost:4000',"http://localhost:3000"],
  credentials: true };
// Middleware
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// @route GET /
// @desc Loads form
app.get('/', (req,res)=>{
  res.render('index');
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
/**
 * Router Middleware
 * Router - /upload/*
 * Method - *
 */
app.use("/upload", upload);
/**
 * Router Middleware
 * Router - /collections/*
 * Method - *
 */
app.use("/collections", collections);
/**
 * Router Middleware
 * Router - /search/*
 * Method - *
 */
app.use("/search", search);
/**
 * Router Middleware
 * Router - /comment/*
 * Method - *
 */
app.use("/comment", comment);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

