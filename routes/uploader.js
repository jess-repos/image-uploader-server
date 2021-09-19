const Image = require("../models/Image");

const router = require("express").Router();

const fs = require("fs");

//middleware{}

router.post("/upload", ah, async (req, res, next) => {
  console.log("Request POST: /api/uploader/upload");
  const { imageFile } = req.files;
  const { name, data, size, encoding, tempFilePath, truncated, mimetype, md5 } =
    imageFile;
  let fileName = uuid() + imageFile.name.toLowerCase().replace(" ", "-");
  await fs.writeFileSync("uploads/" + fileName, data);
  // let test = await fs.readFileSync("uploads/" + fileName);
  let url = "http://localhost:7000/images/" + fileName;


  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true });
  }
  console.log(url);

  res.send(url);
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

