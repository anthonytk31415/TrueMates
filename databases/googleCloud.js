require("dotenv").config();

const { Storage } = require('@google-cloud/storage');
const googleProjectId = process.env.GOOGLEPROJECTID; 
const gpdKeyPath = process.env.GOOGLEPROJECTID_KEYPATH;
const projectId = googleProjectId; // Replace with your project ID
const keyFilename = gpdKeyPath; // Replace with the path


const express = require("express");
const router = express.Router();

const bucketName = 'damon-stefan-bucket-tm'; // Replace with your bucket name
const storage = new Storage({
  projectId,
  keyFilename,
});

const fileName = "celes_walk_right0.png";;
// this works!

async function fetchImage(filenName){
    const [file] = await storage.bucket(bucketName).file(fileName).get();
    return file; 
}


async function uploadImage(){
    
}

router.get("/download", async function (req, res) {

  
    try {

      const file = await fetchImage(fileName); 
      file.createReadStream().pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error downloading file');
    }
  });

module.exports = router;