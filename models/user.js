
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
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

module.exports = User;