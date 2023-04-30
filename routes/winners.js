const express = require("express");
const winnersController = require("../controller/winners");

const router = express.Router();

router
  .route('/')
  .post(winnersController.create) // ADDING WINNERS
  .get(winnersController.findAll); // GET ALL WINNERS

module.exports = router;
