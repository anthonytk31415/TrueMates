const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const User = require("../models/user");
const Login = require("../models/login");

async function createUser(name, email) {
  try {
    const newUser = await User.create({
      name: name,
      email: email,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user.", error);
  }
}

async function createLogin(userId, password) {
  try {
    const newLogin = await Login.create({
      userId: userId,
      password: password,
    });
    return newLogin;
  } catch (error) {
    console.error("Error creating user login credentials.", error);
  }
}

router.post("/register", async function (req, res, next) {
  try {
    let { username, email, password } = req.body;
    let user = await User.findOne({
      where: {
        [Op.or]: [{ name: username }, { email: email }],
      },
    })
    if (user){
      throw {code: 400, message: "Username and/or email taken"};
    }
    let newUser = await createUser(username, email);
    if (!newUser){
      console.error("Error creating User in db");
      throw {code: 500, message: "Internal server error"};
    }
    let newLogin = await createLogin(newUser.userId, password);
    if (!newLogin){
      console.error("Error creating Login in db");
      throw {code: 500, message: "Internal server error"};
    }
    return res.status(201).json({ message: "User created successfully" });
  } catch(error) {
    console.error(error);             
    if (error.code && error.message){
        res.status(error.code).json({ error: error.message });
    } else {
        res.status(500).json({ error: "Internal service error" });
    }
  }
});

module.exports = router;
