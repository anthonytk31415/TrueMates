require("dotenv").config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: "truemates",
    dialect: 'postgres', 
    user: process.env.DB_USERNAME,
    password: process.env.DB_KEY,
    host: process.env.DB_HOST,    
});

module.exports = sequelize;