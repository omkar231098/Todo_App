
const { UserModel } = require("../Model/user.model");


const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");


require("dotenv").config();

// Function to generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.NormalToken, {
    expiresIn: "1d",
  });
};

// User registration route
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the given email already exists
    user = await UserModel.findOne({ email });

    if (user) {
      // Return an error if the user already exists
      return res.status(400).json({
        success: true,
        message: "User already exists. Please use a different email.",
      });
    }

    // Hash the user's password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user instance and save it to the database
    user = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    // Return success message after successful registration
    res.status(200).json({
      success: true,
      message: "Registration successful! You can now log in.",
    });
  } catch (err) {
    // Handle server error if registration fails
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// User login route
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the given email
    let user = await UserModel.findOne({ email });

    // Return an error if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    // Return an error if the passwords do not match
    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: "Invalid Credentials" });
    }

    // Generate a JWT token for the authenticated user
    const accessToken = generateToken(user);

    // Return success message and token after successful login
    res.status(200).json({
      status: true,
      message: "Successfully login",
      accessToken,
    });
  } catch (error) {
    // Handle server error if login fails
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};


module.exports = { register, login };
