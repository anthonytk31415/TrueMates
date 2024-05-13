console.log("hello world");

require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
        'truemates', 
        process.env.DB_USERNAME, 
        process.env.DB_KEY, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

sequelize
    .authenticate()
    .then(() => {
        console.log("db connection successful. ");
    })
    .catch((err) => {
        console.error("unable to connect to db.", err);
    });

