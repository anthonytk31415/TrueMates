require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express')
const sequelize = require('./config/databases/sequelize');
const dbPort = process.env.DB_PORT; 
const fileSizeLimit = process.env.FILE_SIZE_LIMIT; 

// routes exports
const {authenticateRoutes} = require('./routes/authentication');
const register = require('./routes/register');
const posts = require('./routes/posts');
const friends = require('./routes/friends');

// sample call to sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database successful. ");
  })
  .catch((err) => {
    console.error("Unable to connect to database.", err);
  });

// instantiate and import 
const app = express();

// app settings
app.use(bodyParser.json());
app.use(express.json({ limit: fileSizeLimit }));
app.use(express.urlencoded({ limit: fileSizeLimit , extended: true }));


// route definitions
app.use('/', authenticateRoutes);
app.use('/', register);
app.use('/', posts);
app.use('/', friends);

// establish the BE listener
app.listen(dbPort, function(){
    console.log(`App running on port = ${dbPort}`)
});