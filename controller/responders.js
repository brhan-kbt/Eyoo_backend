const db = require("../models");
const Responder = db.responders;
const Question = db.questions;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.phone_number) {
    res.status(400).send({
      message: "phone can not be empty!",
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }
  if (!req.body.answers) {
    res.status(400).send({
      message: "answers can not be empty!",
    });
    return;
  }

  const answers = req.body.answers;

  const response = {
    phone_number: req.body.phone_number,
    name: req.body.name,
    question_1: null,
    question_2: null,
    question_3: null,
    question_4: null,
    score: 0,
    date: new Date(Date.now()).toISOString()
  };

  for (let answer_number = 0; answer_number < answers.length; answer_number++) {
    Question.findByPk(answers[answer_number].id)
      .then((data) => {
        if (data.answer === answers[answer_number].answer) {
          response[`question_${answer_number + 1}`] = true;
          response.score++;
        } else {
          response[`question_${answer_number + 1}`] = false;
        }

        if (answer_number == answers.length - 1) {
          Responder.create(response)
            .then((data) => {
              res.status(200).send({
                message: "answer_submitted"
              });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the question.",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving questions.",
        });
      });
  }
};

// Retrieve yesterday's responder from the database.
exports.yesterdaysResponder = (req, res) => {
  var today = new Date();
  today.setDate(today.getDate() - 1);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  var yesterdaysResponder = {
    date: { [Op.gte]: today.toISOString() },
  };

  try {
    Responder.findAll({
      where: yesterdaysResponder,
      order: [
        ["date", "ASC"], // Sorts by DATE in ascending order
      ],
    }).then((data) => {
      res.status(200).send({
        message: "success",
        data,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "error occur while fetching responders!!",
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
