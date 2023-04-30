const express = require("express");
const subscriberControler = require("../controller/subscribers");

const router = express.Router();

router
  .route("/")
  .post(subscriberControler.create) // ADDING SUBSCRIBERS
  .get(subscriberControler.findAll); // GET ALL SUBSCRIBERS

module.exports = router;
