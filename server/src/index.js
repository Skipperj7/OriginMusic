const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const methodOverride = require('method-override');
const upload = require("./routes/upload");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine','ejs');//using ejs to test (replaced by react front end)
app.set('views', './src/views'); //set to ./views for docker, ./src/views for dev

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

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});