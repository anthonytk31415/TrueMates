require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "truemates",
  process.env.DB_USERNAME,
  process.env.DB_KEY,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);


module.exports = sequelize;