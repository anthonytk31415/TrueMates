require("dotenv").config();

const { Sequelize } = require('sequelize');

/**
 *  sequelize is the Sequalize object to connect to the Postgres database. 
 */
const sequelize = new Sequelize({
    database: "truemates",
    dialect: 'postgres', 
    user: process.env.DB_USERNAME,
    password: process.env.DB_KEY,
    host: process.env.DB_HOST,    
});

module.exports = sequelize;