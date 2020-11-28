var { Router } = require("express"),
  User = require("../models/user"),
  route = require("express").Router(),
  multer = require("../utils/multer_upload"),
  uploadFile = require("../utils/google/uploadFile"),
  downloadFile = require("../utils/google/downloadFile"),
  middleware = require("../middlewares/auth"),
  fs = require("fs");
route.get("/", middleware, async (req, res) => {
  try {
    let user = await User.findOne({ userId: req.body.userId });
    res.status(200).json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

route.get("/:id", middleware, async (req, res) => {
  try {
    let user = await User.findOne({ userId: req.body.userId });
    let flag = 0;
    for (let file of user.files) {
      if (file.id === req.params.id) {
        flag = 1;
        downloadFile(req.body.token, req.params.id, file.extension);
        res.status(200).json({ msg: "file downloaded" });
      }
    }
    if (flag === 0) res.status(404).json({ error: "file not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

route.post("/", multer.array("images", 1), middleware, (req, res) => {
  var fs = require("fs");
  console.log(req.files[0]);
  fs.readFile(req.files[0].path, "utf8", function (err, data) {
    if (err) throw err;
  });
  uploadFile(req, req.body.token);
  res.status(200).json({
    msg: "file is uploaded",
  });
});

module.exports = route;
