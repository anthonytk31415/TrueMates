const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databases/sequelize');
const User = require('./user');

const Post = sequelize.define('Post', {
    postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'userId'
        }
    },
    description: {
        type: Sequelize.STRING,
    },
    
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING) // Array of strings
    }

}, {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});


Post.belongsTo(User, {foreignKey: 'userId'});

Post.updateImageAndTimestamp = async function (postId, newImages) {
    const updatedPost = await Post.update({
        images: newImages,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
    }, {
        where: {
            postId: postId
        }
    });
    return updatedPost;
};

// Post.calculateTimeDiff = async function (postId, newImages) {
// };


module.exports = Post;