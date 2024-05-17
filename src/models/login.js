const { Sequelize } = require('sequelize');
const sequelize = require('../config/databases/sequelize');

const User = require('./user');

const Login = sequelize.define('Login', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        references: {
            model: User, 
            key: 'userId'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

Login.belongsTo(User, {foreignKey: 'userId'});

module.exports = Login;