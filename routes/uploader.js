const Image = require("../models/Image");

const router = require("express").Router();

const fs = require("fs");
const { uuid } = require("uuidv4");

//middleware{}

router.post("/upload", async (req, res, next) => {
  console.log("Request POST: /api/uploader/upload");
  const { imageFile } = req.files;
  const { name, data, size, encoding, tempFilePath, truncated, mimetype, md5 } =
    imageFile;
  let fileName = uuid() + "-" + imageFile.name.toLowerCase().replace(" ", "-");
  console.log("FILENAME: " + fileName);

  try {
    await fs.writeFileSync("uploads/" + fileName, data);
    // let test = await fs.readFileSync("uploads/" + fileName);
    let url = "http://localhost:7000/images/" + fileName;
    let imageObject = new Image({
      name: name,
      fileName: fileName,
      url: url,
      size: size,
      encoding: encoding,
      tempFilePath: tempFilePath,
      truncated: truncated,
      mimetype: mimetype,
      md5: md5,
    });
    const response = await imageObject.save();
    console.log(response);
    res.send(url);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true });
  }
});

router.delete("/wipe", async (req, res) => {
  console.log("[WARNING] Deleting all records!");
  try {
    await Image.deleteMany();
    res.send("collection wiped successfully");
  } catch {
    res.send("failed to wipe collection");
  }
});

module.exports = router;
