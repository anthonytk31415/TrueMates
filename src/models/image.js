const { Sequelize } = require('sequelize');
const sequelize = require('../config/databases/sequelize');

const Post = require('./post');

const Image = sequelize.define('Image', {
    imageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Post, 
            key: 'postId'
        }
    },
}, {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

Image.belongsTo(Post, {foreignKey: 'postId'});


module.exports = Image;