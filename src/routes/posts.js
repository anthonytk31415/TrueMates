require('dotenv').config();
const express = require("express");
const multer = require('multer');
const router = express.Router();
const { verifyAuth } = require("./authentication");
const { uploadFile } = require("../config/databases/googleCloud");
const upload = multer();
const imageLimit = process.env.POST_IMAGE_LIMIT;
const Post = require("../models/post");
const Image = require("../models/image");

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
                    await Image.destroy({where: {imageId: imageId}}); 
                }
                // delete them in GCP
            }
        }
        if (newPost){
            if (await Post.findOne({where: {postId: newPost.postId}})) {
                await Post.destroy({where: {postId: newPost.postId}}); 
            }
        }
        // console.error("Failed to create the post: ", error.message)
        // const errorMessage = "Could not create the post."; 
        // res.status(500).json({ error: errorMessage });

        console.error(error);             
        if (error.code && error.message){
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal service error" });
        }
    }
});
    // get images files

    // // add in the GCP code with the array of images






// })


module.exports = router;
