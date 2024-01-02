
const express = require("express");


const auth = express.Router();


const { login, register } = require("../Controllers/authController");


auth.use(express.json());

// Define routes with associated controller methods
auth.post("/register", register); // User registration
auth.post("/login", login); // User login


module.exports = { auth };
