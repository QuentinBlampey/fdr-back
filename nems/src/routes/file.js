const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

var fs = require("fs");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, 'current')
  }
})

var upload = multer({storage:storage});

// THIS ROUTE IS USED TO UPLOAD A FILE CONTAINING THE NEW QUESTIONS TREE

router.post("/newfile", upload.single("file"), function(req, res, next) {
  var obj = JSON.parse(fs.readFileSync("./uploads/current", "utf8"));
  Question.deleteMany({}, async (err, del) => {
    Question.insertMany(obj, async (err, ins) => {
      if (err){res.send(err)}
      else{
        res.send(ins);
      }
    });
  });
});

module.exports = router;

router.post("/clear", function(req, res, next) {
  Question.deleteMany({}, async (err, del) => {
    res.send(del);
  });
});