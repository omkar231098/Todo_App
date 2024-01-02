const express = require("express");

const auth = express.Router();

const { login, register } = require("../Controllers/authController");

auth.use(express.json());

auth.post("/register", register);
auth.post("/login", login);

module.exports = { auth };
