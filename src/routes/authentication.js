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
            return res.status(403).json({ message: 'Token is invalid' });
        }
        req.user = {
            userId: decoded.userId, 
            email: decoded.email
        };
        next();
    });
}

router.post('/login', async function(req, res, next) {
    try {
        let {email, password} = req.body;
        if (!email){
            throw { code: 400, message: "Email not provided" } ;
        }
        if (!password){
            throw { code: 400, message: "Password not provided" } ;
        }
        let userId;
        let login; 
        let user = await User.findOne({where: { email: email }});
        if (user) {
            userId = user.userId; 
            login = await Login.findOne({where: { userId: user.userId }});
        } else {
            throw { code: 401, message: "Email is not registered"};
        }
        if (!login.password) {
            throw { code: 500, message: "Internal service error"};
        } else if (login.password != password){
            throw { code: 401, message: "Invalid password"};
        }
        let token = jwt.sign(
                { userId: userId, email: email }, 
                secretKey, 
                { expiresIn: tokenExpiration }
                );
        return res
            .status(201)
            .json({
                success: true, 
                data: {token: token},
            }); 
    } catch(error) {
        console.error(error);             
        if (error.code && error.message){
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal service error" });
        }
    }
}); 

module.exports = {
    authenticateRoutes: router, 
    verifyAuth: verifyAuth
};


