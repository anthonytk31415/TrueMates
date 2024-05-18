require('dotenv').config();
const express = require("express");
const router = express.Router();
const { verifyAuth } = require("./authentication");
const FriendConnection = require('../models/friendConnection');


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
        console.log("userId: ", userId, "friendId: ", friendId);
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

module.exports = router;
