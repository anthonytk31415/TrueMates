require("dotenv").config();
const bodyParser = require('body-parser');
// const cors = require('cors');
const express = require('express')
const sequelize = require('./databases/sequelize');

const dbPort = process.env.DB_PORT; 





// routes exports
const {authenticateRoutes} = require('./routes/authentication');
const register = require('./routes/register');
const pages = require('./routes/pages');
const posts = require('./routes/posts');
const gc = require("./databases/googleCloud");





// sample call to sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("db connection successful. ");
  })
  .catch((err) => {
    console.error("unable to connect to db.", err);
  });



// instantiate and import 
const app = express();

////////////////////////////////
app.use(bodyParser.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Allow requests from http://localhost:3000
// app.use(cors({
//     origin: 'http://localhost:e000',
//     methods: 'GET,POST',
// }));


////////////////////////////////
// route definitions
////////////////////////////////

app.use('/', authenticateRoutes);
app.use('/', register);
app.use('/', pages);
app.use('/', posts);
app.use('/', gc);

// establish the BE listener
app.listen(dbPort, function(){
    console.log(`App running on port = ${dbPort}`)
});