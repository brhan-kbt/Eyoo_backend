const express = require("express");
const questionsControler = require("../controller/questions");

const router = express.Router();

router
  .route("/")
  .post(questionsControler.create)
  // .patch(questionsControler.update)
  .get(questionsControler.TodaysQuestion);

router
  .route('/:id')
  .get(questionsControler.findAll)
  .patch(questionsControler.update)
  .delete(questionsControler.findAll);
  
router
  .route("/upcoming")
  .get(questionsControler.Upcoming);

// router
//     .route('/:id')
// .get(questionsControler.TodaysQuestion)
// .patch(questionsControler.TodaysQuestion)
// .delete(questionsControler.TodaysQuestion);

module.exports = router;
