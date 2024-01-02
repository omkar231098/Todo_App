const { UserModel } = require("../Model/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.NormalToken, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({
          success: true,
          message: "User already exists. Please use a different email.",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Registration successful! You can now log in.",
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    user = await UserModel.findOne({ email });

    if (!user) {
      return res.json(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credetials" });
    }

    const accessToken = generateToken(user);

    res.status(200).json({
      status: true,
      message: "Successfully login",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};

module.exports = { register, login };
