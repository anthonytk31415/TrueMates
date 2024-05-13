
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/sequelize');

const User = sequelize.define('User', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true, // This line enables automatic timestamps
    createdAt: 'created_at', // Customize the name of createdAt column if needed
    updatedAt: 'updated_at' // Customize the name of updatedAt column if needed
});

module.exports = User;