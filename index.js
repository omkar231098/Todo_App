const express = require("express");
const cors = require("cors");

const { TodoRouter } = require("./routes/todo");
const { auth } = require("./routes/auth");
const { connection } = require("./configs/db");

const app = express();
app.use(express.json());
require("dotenv").config();

const corsOptions = {
  origin: true, // Allow all origins
};

app.use(cors(corsOptions));
app.use("/auth", auth);

app.use("/url", TodoRouter);


const port = process.env.PORT || 8500; // Use process.env.PORT

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Not able to connect to MongoDB");
    console.log(err);
  }

  console.log(`Server is running on port ${port}`);
});
