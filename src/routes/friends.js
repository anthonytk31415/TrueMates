require('dotenv').config();
const express = require("express");
const router = express.Router();
const { verifyAuth } = require("./authentication");
const FriendConnection = require('../models/friendConnection');
const User = require('../models/user');

/**
 * POST /friend/:friendId
 * Builds a friend connection between user and friend, if it doesn't exist.  
 */
router.post('/friend/:friendId', verifyAuth, async function(req, res) {
    try {
        const friendId = req.params.friendId;
        let { userId } = req.user;        // user = token
        if (!userId){
            throw { code: 400, message: "Invalid input: no friend userId provided"};    
        }
        // check for valid friends
        let userA = await User.findByPk(userId);
        let userB = await User.findByPk(friendId);
        if (!userA || !userB){
            throw { code: 400, message: "Invalid input: friendId not valid"};    
        }


        let friendConnection = await FriendConnection.addFriendConnection(userId, friendId); 
        if (!friendConnection){
            throw { code: 400, message: "Invalid input: relationship already exists"};    
        }
        return res.status(201).json({ message: "Friend connection successfully created"}); 
    } catch(error){
        console.error(error);             
        if (error.code && error.message){
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal service error" });
        }
    }
}); 


/**
 * GET /friend/:friendId
 * Friends List endpoint returns friends' info and number of mutual friends (i.e. count of common friends of friend A - yourself, and friend B). 
 * Requires login. Output is an object (dictionary) with keys: mutualFriends (count of common friends), and friendsInfo (an array of infos of friends). 
 */

router.get('/friend/:friendId', verifyAuth, async function(req, res) {
    try {
        const friendId = req.params.friendId;
        let { userId } = req.user;        // user = token
        if (!userId){
            throw { code: 400, message: "Invalid input: no friend userId provided"};    
        }

        let userA = await User.findByPk(userId);
        let userB = await User.findByPk(friendId);
        if (!userA || !userB){
            throw { code: 400, message: "Invalid input: friendId not valid"};    
        }

        let commonFriendsInfo = await FriendConnection.findCommonFriends(userId, friendId); 
        if (commonFriendsInfo == null){
            throw { code: 500, message: "Internal service error"};    
        }
        let numFriends = commonFriendsInfo.length; 

        return res.status(201).json({ OK: true, mutualFriends: numFriends, friendsInfo: commonFriendsInfo}); 
    } catch(error){
        console.error(error);             
        if (error.code && error.message){
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal service error" });
        }
    }
}); 



module.exports = router;
