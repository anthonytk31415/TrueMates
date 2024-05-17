require('dotenv').config();
const express = require("express");
const multer = require('multer');
const router = express.Router();
const { verifyAuth } = require("./authentication");
const { uploadFile, deleteFileIfExists } = require("../config/databases/googleCloud");
const upload = multer();
const imageLimit = process.env.POST_IMAGE_LIMIT;
const Post = require("../models/post");
const Image = require("../models/image");


/**
 * POST /posts
 * Uploads description and array from the html payload to create a post. 
 */
router.post('/posts', verifyAuth, upload.array('images'), async function(req, res) {
    let newPost; 
    let imageContainer = []; 
    try {
        const files = req.files; 
        if (files.length > imageLimit){
            console.log("invalid token input.");
            return res.status(400).json({ message: 'You have exceeded the image limit' });
        };    
        // create the post to retrieve the postId to place in each image
        let {userId} = req.user;        // user = token
        let {description, images} = req.body; 
        newPost = await Post.create({
            userId: userId, 
            description: description, 
            images: imageContainer
        })
        if (!newPost){
            console.error("Failed to post in db");
            throw { code: 500, message: "Internal service error"};;   
        }
        let postId = newPost.postId; 
        // add images to database to get id, then use id to store in blog storage
        for (const imageFile of files ){
            const newImage = await Image.create({ postId: postId });
            if (!newImage){
                console.error("Failed to create image in db");
                throw { code: 500, message: "Internal service error"};; 
            }
            imageContainer.push(newImage.imageId)                
            await uploadFile(newImage.imageId, imageFile.buffer);
        }
        await Post.updateImageAndTimestamp(postId, imageContainer);
        return res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        // for any created assets, destroy them to stay tidy
        if (imageContainer){
            for(const imageId of imageContainer){
                if (await Image.findOne({where: {imageId: imageId}})) {
                    await deleteFileIfExists(imageId);                      // blob delete
                    await Image.destroy({where: {imageId: imageId}});       // RDB delete
                }                
            }
        }
        if (newPost){
            if (await Post.findOne({where: {postId: newPost.postId}})) {
                await Post.destroy({where: {postId: newPost.postId}}); 
            }
        }
        console.error(error);             
        if (error.code && error.message){
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal service error" });
        }
    }
});

/**
 * GET /posts/:postId/time
 * Get the time delta from now to created time for a specific postId.
 */
router.get('/posts/:postId/time', verifyAuth, async function(req, res) {
    const postId = req.params.postId;
    
    try {
        let postTimeDiffFromNow = await Post.getTimeDiffFromNow(postId);
        if (!postTimeDiffFromNow){
            throw { code: 400, message: "Invalid postId"};; 
        }
        return res.status(200).json({ timeDiffFromNow: postTimeDiffFromNow}); 
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
 * PUT /posts/:postId/description
 * Update the postId for a given post. user must be logged in and own that postId. 
 */
router.put('/posts/:postId/description', verifyAuth, upload.array('images'), async function(req, res) {
    try {
        const postId = req.params.postId;
        let { userId } = req.user;        // user = token
        let { description } = req.body; 
        let curPost = await Post.findOne({
            where: { postId: postId, userId: userId
        }});
        if (!curPost){
            throw { code: 400, message: "Invalid request: invalid postId and/or userId"};    
        }
        const updatedPost = await Post.update({
            description: description
            }, {
            where: { postId: postId, userId: userId}
        });
        if (!updatedPost){
            throw { code: 500, message: "Internal service error"};
        }
        return res.status(202).json({ message: "Post successfully updated"}); 
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
