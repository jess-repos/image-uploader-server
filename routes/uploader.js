const Image = require("../models/Image");

const router = require("express").Router();

router.post("/upload", async (req, res) => {
  console.log("Request POST: /api/uploader/upload");
  const { imageName } = req.body;
  const { imageFile } = req.files;
  let data = imageFile.data

  console.log("[IMAGE NAME]", imageName);
  console.log("[IMAGE file]", imageFile);
  try {
    // convert buffer response to proper image
    const img = new Buffer.from(data).toString("base64");
    let url = "data:image/png;base64," + img;
    const image = new Image({
      name: imageName,
      url: url,
    });
    const savedImage = await image.save();
    // console.log(savedImage);
    res.send(url);
  } catch (err) {
    console.log("failed to upload", err);
    res.send(err);
  }
});

router.post("/test", async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  // console.log(req)
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
