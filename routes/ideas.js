const express = require("express");
const ideasController = require("../controller/ideas");

const router = express.Router();

router
  .route("/")
  .post(ideasController.create) // ADDING IDEAS
  .get(ideasController.findAll); // GET ALL IDEAS

module.exports = router;
