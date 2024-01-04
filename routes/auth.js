
const express = require("express");


const auth = express.Router();


const { login, register } = require("../Controllers/authController");
const { validateEmailAndPassword } = require('../Validators/validator');


auth.use(express.json());

// Define routes with associated controller methods
auth.post("/register", validateEmailAndPassword, register); // User registration
auth.post("/login", validateEmailAndPassword, login); // User login


module.exports = { auth };
