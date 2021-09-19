const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const path = require("path");

const app = express();
app.listen(process.env.API_PORT);
app.use("/images", express.static(path.join(__dirname, "uploads")));

// middlewares
// app.use(express.json()); // json parser
app.use(cors()); // cross site

// enable files upload
app.use(
  fileUpload({  
    createParentPath: true,
  })
);

// route middlewares
app.use("/api/uploader", require("./routes/uploader"));

// connect to database and run server
const run = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("connected to database")
    );

    console.log(`app server running on port: ${process.env.API_PORT}`);
  } catch (err) {
    console.log(err.message);
  }
};
run();
