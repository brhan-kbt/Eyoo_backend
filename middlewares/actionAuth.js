// authorize action call
const db = require("../models");
const Question = db.questions;
const Op = db.Sequelize.Op;

const actionAuth = (req, res, next) => {
  // getting respond answers
  const answers = req.body.answers;
  var ids = []; // 1 2 3

  for (let answer_number = 0; answer_number < answers.length; answer_number++) {
    ids.push(answers[answer_number].id);
  }

  var condition = {
    id: {
      [Op.or]: ids,
    },
  };

  Question.findAll({ where: condition })
    .then((data) => {
      // check if all questions are available for now
      if (
        data.some((question) => {
          return (
            new Date(question.startDate).toISOString() >
              new Date(Date.now()).toISOString() ||
            new Date(question.endDate).toISOString() <=
              new Date(Date.now()).toISOString()
          );
        })
      ) {
        res.status(500).send({
          message: "Sorry These Questions are not Available for Now",
        });
      } else next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred on question validation.",
      });
    });
};

module.exports = actionAuth;
