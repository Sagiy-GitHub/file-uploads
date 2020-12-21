const express = require("express");
const fs = require("fs");
const path = require("path");
var multer = require("multer");
let images = require("./images.json");

var app = express();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./PhotoGallery");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

var upload = multer({ storage });

app.use(express.static("./public"));
app.use("/PhotoGallery", express.static("./PhotoGallery"));
app.use(upload.single("CarImage"));

app.get("/image-data", (req, res) => {
  res.status(200).json(images);
});

app.post("/profile", (req, res, next) => {
 
  let newPicObj = {
    image: req.file.filename,
    caption: req.body.caption,
  };

  images.push(newPicObj);
  fs.writeFile("./images.json", JSON.stringify(images), (err) => {
    if (err) {
      res.end("something went wrong!");
    }

    res.redirect("/gallery.html");
  });
 
});

app.delete("/delete/:image", (req, res, next) => {

  const { image } = req.params;

  images = images.filter((i) => i.image !== image);

  fs.writeFile("./images.json", JSON.stringify(images), (err) => {
    if (err) {
      res.end("something went wrong!");
    }

    res.end("Image Deleted");
  });
});

app.listen(5000);
