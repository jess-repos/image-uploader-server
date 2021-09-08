const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// const Image = require("./models/Image");
require("dotenv").config();

const app = express();
app.listen(process.env.API_PORT || 3000);

// middlewares
app.use(express.json());
app.use(cors());



// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// route middlewares
app.use("/api/uploader", require("./routes/uploader"));

app.get("/", (req, res) => {
  res.send("Image Uploade API")
})

// connect to database and run server
const run = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nine:root@nine-nfire.f9yn8.mongodb.net/image-uploader?retryWrites=true&w=majority",
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
