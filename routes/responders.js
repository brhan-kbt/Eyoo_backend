const express = require("express");

// FIXME: controllers are not the right controller
const respondersControler = require("../controller/responders");
const actionAuth = require("../middlewares/actionAuth");

const router = express.Router();

router
  .route("/")
  .post(respondersControler.create)
  .get(respondersControler.yesterdaysResponder);

// router
//   .route("/:id")
//   .get(respondersControler.findAll)
//   .patch(respondersControler.findAll)
//   .delete(respondersControler.findAll);

module.exports = router;
