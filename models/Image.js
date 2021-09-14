const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  name: String,
  fileName: String,
  url: String,
  size: Number,
  encoding: String,
  tempFilePath: String,
  truncated: Boolean,
  mimetype: String,
  md5: String,
});
module.exports = new mongoose.model("Image", imageSchema);
