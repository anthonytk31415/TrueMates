const { Sequelize, Op} = require('sequelize');
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
        let a_to_b  = await FriendConnection.findOne({where: 
            {friendA: friendAId, 
             friendB: friendBId   
            }});
        let b_to_a = await FriendConnection.findOne({where: 
            {friendA: friendBId, 
             friendB: friendAId
            }});
        if (a_to_b || b_to_a){
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

/**
 * Return a set of friend Ids of people that are friends with userId
 * @param {*} connections 
 * @param {*} userId 
 * @returns 
 */
function getFriends(connections, userId){
    res = new Set();
    for(const connection of connections){
        console.log("connection:", connection, "connection.friendA", connection.friendA, "connection.friendB", connection.friendB);
        if (connection.friendA != userId){
            res.add(connection.friendA);            
        }
        if (connection.friendB != userId){
            res.add(connection.friendB);            
        }
    }
    return res;
}

/**
 * get all the friend connections of userId (i.e. where userId is in friendA or friendB)
 * @param {*} userId 
 * @returns 
 */
async function getAllFriendConnections(userId){
    return await FriendConnection.findAll({
        where: {
            [Op.or]: [
              { friendA: userId },
              { friendB: userId }
            ]
        }
    });
}


/**
 * Friends List endpoint returns friends' info and number of mutual friends (i.e. count of common friends of friend A - yourself, 
 * and friend B). Requires login. 
 */

FriendConnection.findCommonFriends = async function (friendAId, friendBId) {
    try {
        let a_connections  = await getAllFriendConnections(friendAId); 
        let a_friendSet = getFriends(a_connections, friendAId);
        
        let b_connections  = await getAllFriendConnections(friendBId); 
        let b_friendSet = getFriends(b_connections, friendBId);

        let mutualFriends = new Set();
        for (const a_id of a_friendSet){
            if (b_friendSet.has(a_id)){
                mutualFriends.add(a_id);
            } 
        }

        let res = [];
        for(const mutualFriendUserId of mutualFriends){
            let curUser = await User.findByPk(mutualFriendUserId); 
            res.push(curUser);
        }
        return res;         
    } catch(error) {
        console.error("Internal service error: ", error);        
    }
};


module.exports = FriendConnection;