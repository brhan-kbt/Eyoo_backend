const db = require("../models");
const Winners = db.winners;
const express = require("express");
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// exports.create = (req, res) => {
//   const winners = {
//     name: req.body.name ? req.body.name : null,
//     email: req.body.email ? req.body.email : null,
//     phone_number: req.body.phone_number ? req.body.phone_number : null,
//     cardBirr: req.body.cardBirr ? req.body.cardBirr : null,
//     date: req.body.date ? req.body.date : null
//   };

//   if (req.body.photo) {
//     const photoData = req.body.photo.replace(/^data:image\/\w+;base64,/, '');
//     const photoType = req.body.photo.split(';')[0].split('/')[1];
//     const photoName = `photo_${Date.now()}.${photoType}`;

//     const photoPath = path.join(__dirname, '..', 'eyoo', photoName);

//     fs.writeFile(photoPath, photoData, {encoding: 'base64'}, (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send({
//           message: "Error occurred while saving the photo.",
//         });
//         return;
//       }

//       winners.photo = photoPath;

//       Winners.create(winners)
//         .then(() => {
//           res.status(200).send({
//             message: "Winner created successfully.",
//           });
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: err.message || "Some error occurred.",
//           });
//         });
//     });
//   } else {
//     Winners.create(winners)
//       .then(() => {
//         res.status(200).send({
//           message: "Winner created successfully.",
//         });
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: err.message || "Some error occurred.",
//         });
//       });
//   }
// };

app.use(bodyParser.urlencoded({ extended: true }));
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).fields([
  { name: 'photo', maxCount: 1 }
]);

// Handle create request
exports.create = (req, res) => {
  // Parse the form data
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: 'Failed to upload file.'
      });
    }

    console.log("Body2:" + JSON.stringify(req.body));
    console.log("File2:" + JSON.stringify(req.files));

    if (!req.body.name || !req.body.email || !req.body.phone_number || !req.body.cardBirr || !req.body.date || !req.files || !req.files.photo) {
      console.log("Body2:" + JSON.stringify(req.body));
      console.log("File2:" + JSON.stringify(req.files));

      return res.status(400).send({
        message: "Missing required field(s)",
        data: req.body
      });
    }
    // const serverUrl = process.env.LOCAL_HOST; // Example: http://localhost:5000
    // const photoDir = __dirname + '/uploads';
    // const photoName = req.files.photo[0].filename;
    
    // const photoPath = `${photoDir}/${req.files.photo[0].filename}`;


    const serverUrl = `${process.env.LOCAL_HOST}:${PORT}`; // change to your server URL
    const photoDir = 'uploads';
    const photoName = req.files.photo[0].filename;
    const photoPath = `${serverUrl}/${photoDir}/${photoName}`;
    const winners = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      photo: photoPath,
      cardBirr: req.body.cardBirr,
      date: req.body.date,
    };

    Winners.create(winners)
      .then(() => {
        res.status(200).send({
          message: "winner_created_successfully",
          data:winners
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      });
  });
};




// Retrieve all Subscribers from the database.
exports.findAll = (req, res) => {
  Winners.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Winners.",
      });
    });
};


// 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