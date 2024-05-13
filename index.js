
const sequelize = require('./databases/sequelize');
require("dotenv").config();

console.log("hello world");


// sample call to sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("db connection successful. ");
  })
  .catch((err) => {
    console.error("unable to connect to db.", err);
  });


