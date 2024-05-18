const { Sequelize } = require('sequelize');
const sequelize = require('../config/databases/sequelize');

const User = require('./user');

const FriendConnection = sequelize.define('FriendConnection', {
    friendConnectionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    friendA: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'userId'
        }
    },
    friendB: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'userId'
        }
    },
}, {
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

FriendConnection.belongsToMany(User, {through: 'friendA', foreignKey: 'userId' });
FriendConnection.belongsToMany(User, {through: 'friendB', foreignKey: 'userId' });


/**
 * If friendA - friendB connection doesn't exist, friendB - friendA doesn't exist, create a relationship.  
 * @param {*} friendA 
 * @param {*} friendB 
 * @returns 
 */
FriendConnection.addFriendConnection = async function (friendAId, friendBId) {
    try {
        // check if connection doesnt exist 
        console.log("initiating...");
        let a_to_b  = await FriendConnection.findOne({where: 
            {friendA: friendAId, 
             friendB: friendBId   
            }});
        console.log("here's a to b: ", a_to_b);
        let b_to_a = await FriendConnection.findOne({where: 
            {friendA: friendBId, 
             friendB: friendAId
            }});

        console.log("a to b;", a_to_b, "b to a", b_to_a);
        if (a_to_b || b_to_a){
            console.log("friend exists");
            throw new Error("Friend connection already exists"); 
        }
        let connection = await FriendConnection.create({friendA: friendAId, friendB: friendBId}); 
        if (connection){            
            return connection; 
        } else {
            throw new Error("Internal service error");   
        }
        
    } catch(error) {
        console.error("Internal service error: ", error);        
    }
};

module.exports = FriendConnection;