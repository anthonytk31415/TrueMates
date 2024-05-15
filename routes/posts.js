const express = require("express");
const router = express.Router();
const {verifyAuth} = require("./authentication");
require('dotenv').config();

const imageLimit = process.env.POST_IMAGE_LIMIT;

const Post = require("../models/post");

// Routes; create a post


// async function createPost(userId, description, images){
//     try {
//         return await Post.create({
//             userId: userId, 
//             description: description, 
//             images: images
//         }); 
//     } catch (error) {
//         console.error("Error creating post.", error);
//     }; 

// }


router.post('/posts', verifyAuth, function(req, res) {
    let {userId} = req.user;        // from token
    let {description, images} = req.body; 
        
    if (images.length > imageLimit){
        return res.status(400).json({ message: 'You have exceeded the image limit' });
    };

    // foreach image: 
    
    // upload image metadata 
    // upload image 


    // get the image text
    // store the image name into 


    Post.create({
        userId: userId, 
        description: description, 
        images: images
    })
    // add in the GCP code with the array of images





    .then(() => {
        res.status(201).json({ message: "Post created successfully" });
    })
    .catch((error) => {
        const errorMessage = error.message || "Could not create the post.";
        res.status(500).json({ error: errorMessage });
    })
})


module.exports = router;
