// const express = require("express");
// const router = express.Router();
// const { Op } = require("sequelize");
// const User = require("../models/user");
// const Login = require("../models/login");

// async function createUser(name, email) {
//   try {
//     const newUser = await User.create({
//       name: name,
//       email: email,
//     });
//     return newUser;
//   } catch (error) {
//     console.error("Error creating user.", error);
//   }
// }

// async function createLogin(userId, password) {
//   try {
//     const newLogin = await Login.create({
//       userId: userId,
//       password: password,
//     });
//     return newLogin;
//   } catch (error) {
//     console.error("Error creating user login credentials.", error);
//   }
// }

// router.post("/register", async function (req, res, next) {
//   let { username, email, password } = req.body;
//   User.findOne({
//     where: {
//       [Op.or]: [{ name: username }, { email: email }],
//     },
//   })
//     .then((user) => {
//       if (!user) {
//         return createUser(username, email);
//       } else {
//         return Promise.reject(
//           new Error("Username and/or email is already taken")
//         );
//       }
//     })
//     .then((newUser) => {
//       return createLogin(newUser.userId, password);
//     })
//     .then(() => {
//       res.status(201).json({ message: "User created successfully" });
//     })
//     .catch((error) => {
//       const errorMessage = error.message || "Could not create user";
//       res.status(500).json({ error: errorMessage });
//     });
// });

// module.exports = router;
