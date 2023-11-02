const express = require("express");
const dotenv = require("dotenv"); // Correct the require statement
const cors = require("cors");
const mongoose = require("mongoose"); // Correct the require statement
const app = express();

// Load environment variables from .env file
dotenv.config();

// mongo
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("not connected", err));

//middleware

app.use(express.json());

app.use("/", require("./routes/auth"));

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
