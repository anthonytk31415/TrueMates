const express = require('express');
const router = express.Router();

require('dotenv').config();

const secretKey = process.env.SECRETKEY;
const tokenExpiration = process.env.TOKENEXPIRATION;
const jwt = require("jsonwebtoken"); 

const User = require("../models/user");
const Login = require("../models/login");


// Validated the token then provides access to the 
// token's user_id and email via req.user
async function verifyAuth(req, res, next) {
    const token = req.get('authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = {
            userId: decoded.userId, 
            email: decoded.email
        };
        next();
    });
}

router.post('/login', async function(req, res, next) {
    let {email, password} = req.body;
    if (!email || !password){
        return res.status(500).json({error: "No email and/or password provided."});
    }
    let userId; 
    User.findOne({where: {email: email}})
        .then((user) => {
            if (user) {
                userId = user.userId; 
                return Login.findOne({where: {userId: user.userId}});
            } else {
                return Promise.reject(new Error("Error: No user exists with that email."));
            }
        })
        .then((login) => {
            if (!login.password){
                return Promise.reject(new Error("Error: No password was found with that email."));
            } else if (login.password == password){
                return login;
            } else {
                return Promise.reject(new Error("Error: Invalid Password."));
            }
        // give the token
        })
        .then(() => {
            let token = jwt.sign(
            { userId: userId, email: email }, 
            secretKey, 
            { expiresIn: tokenExpiration }
            );
            return token; 
        })
        .then((token) => {
            return res
                .status(201)
                .json({
                    success: true, 
                    data: {token: token},
                }); 
        })
        .catch((error) => {
            const errorMessage = error.message || "error";
            res.status(500).json({error: errorMessage});
        })
    }); 

module.exports = {
    authenticateRoutes: router, 
    verifyAuth: verifyAuth
};


