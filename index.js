const express = require("express");
const cors = require("cors");

const { TodoRouter } = require("./routes/todo");
const { auth } = require("./routes/auth");
const { connection } = require("./configs/db");

const app = express();
app.use(express.json());
require("dotenv").config();

// Check for required environment variables
const requiredEnvVariables = ['mongoURL', 'PORT',"NormalToken"]; // Add your required variables here

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    console.error(`Error: Missing required environment variable: ${variable}`);
    process.exit(1); // Exit the process with an error code
  }
}

const corsOptions = {
  origin: true, // Allow all origins
};

app.use(cors(corsOptions));
app.use("/auth", auth);
app.use("/todo", TodoRouter);

const port = process.env.PORT || 8500;

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Not able to connect to MongoDB");
    console.error(err);
    process.exit(1); // Exit the process with an error code
  }

  console.log(`Server is running on port ${port}`);
});
