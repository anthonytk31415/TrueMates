require("dotenv").config();

const { Storage } = require('@google-cloud/storage');
const googleProjectId = process.env.GOOGLEPROJECTID; 
const gpdKeyPath = process.env.GOOGLEPROJECTID_KEYPATH;
const bucketName = process.env.GOOGLE_BUCKET_NAME; 
const projectId = googleProjectId; 
const keyFilename = gpdKeyPath;

const express = require("express");
const router = express.Router();

const storage = new Storage({
  projectId,
  keyFilename,
});


const fileName = "celes_walk_right0.png";;

async function fetchFile(filename){
  try {
    const [file] = await storage.bucket(bucketName).file(filename).get();
    return file; 
  } catch {
    console.error('Unable to fetch file from blog storage');
    throw { code: 500, message: "Internal server error"}
  }
}

async function uploadFile(filename, uploadFile){
    try {
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(filename);
      await file.save(uploadFile);            
    } catch (error) {
      console.error("Unable to upload file to blog storage");
      throw { code: 500, message: "Internal server error"}
    }
}


async function deleteFileIfExists(filename) {
  try {
    // Check if the file exists
    const [exists] = await storage.bucket(bucketName).file(filename).exists();

    if (exists) {
      await storage.bucket(bucketName).file(filename).delete();
      console.log(`File '${filename}' deleted successfully.`);
    } else {
      console.log(`File '${filename}' does not exist in the bucket.`);
    }
  } catch (error) {
    console.error('Error deleting file from bucket:', error);
    throw { code: 500, message: "Internal server error"};
  }
}

// test function that can get DELETED
// router.get("/download", async function (req, res) {
//     try {
//       const file = await fetchImage(fileName); 
//       file.createReadStream().pipe(res);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error downloading file');
//     }
//   });

// router.post("/uploadfile", async function (req, res) {
//     try {
//       const file = await fetchImage(fileName); 
//       file.createReadStream().pipe(res);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error downloading file');
//     }
//   });


module.exports = {
  fetchFile, uploadFile, deleteFileIfExists
};
