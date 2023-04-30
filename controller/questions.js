const db = require("../models");
const Question = db.questions;
const Op = db.Sequelize.Op;

/* create and save new question */

exports.create = (req, res) => {
  // Validate request

  console.log("function called")
  console.log(req.body);

  if (!req.body.question) {
    res.status(400).send({
      message: "question can not be empty!",
    });
    return;
  }

  if (!req.body.answer) {
    res.status(400).send({
      message: "answer can not be empty!",
    });
    return;
  }

  if (!req.body.startDate) {
    res.status(400).send({
      message: "answer can not be empty!",
    });
    return;
  }

  if (!req.body.endDate) {
    res.status(400).send({
      message: "answer can not be empty!",
    });
    return;
  }

  // Create a Question

  const question = {
    question: req.body.question,
    choice_a: req.body.choice_a ? req.body.choice_a : null,
    choice_b: req.body.choice_b ? req.body.choice_b : null,
    choice_c: req.body.choice_c ? req.body.choice_c : null,
    choice_d: req.body.choice_d ? req.body.choice_d : null,
    answer: req.body.answer,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    isActive: req.body.isActive,
  };

  var condition = {
    startDate: { [Op.eq]: question.startDate },
    endDate: { [Op.eq]: question.endDate },
  };

  // Save Question in the database

  Question.count({
    where: condition,
  })
    .then((data) => {
      if (data < 4) {
        Question.create(question)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the question.",
            });
          });
      } else {
        res.status(500).send({
          message: `you reach maximum question number limit for ${question.startDate} !! `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting today's question.",
      });
    }); // counting total number of question at the given day and it always must be 4 for all days
};


exports.update = async (req, res) => {
 
  const question = req.body;
  const id = req.params.id;

  // Update the database with the new question
  await Question.update(question, {
    where: { id: id },
  })
    .then(() => { 
      res.status(200).send({
        message: "Question updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the question.",
      });
    });
};


// GETTING TODAY'S ACTIVE QUESTION

 exports.TodaysQuestion = (req, res) => {
  let  today = new Date().toISOString().slice(0, 10); // getting current date

   // conditions for todays question only
   var condition = {
     startDate: { [Op.lte]: today },
     endDate: { [Op.gte]: today },
   };

  //  res.send(condition)
   Question.findAll({
    // where: condition,
    attributes: {
           exclude: [
             "createdAt",
            //  "updatedAt",
            //  "answer",
            //  "isActive",
            //  "startDate",
            //  "endDate",
           ],
         },}
   )
     .then((data) => {
       res.send(data);
     })
     .catch((err) => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving Subscribers.",
       });
     });
 };
// exports.TodaysQuestion = (req, res) => {
//   let  today = new Date().toISOString().slice(0, 10); // getting current date

//   // conditions for todays question only
//   var condition = {
//     startDate: { [Op.lte]: today },
//     endDate: { [Op.gte]: today },
//   };

//   Question.findAll({
//     where: condition,
//     attributes: {
//       exclude: [
//         "createdAt",
//         "updatedAt",
//         "answer",
//         "isActive",
//         "startDate",
//         "endDate",
//       ],
//     },
//   })
//     .then((data) => {
//       // if data length is greater that 0 the data should be responded to the request
//       // else the upcomming questions date should be responded to the request

//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving questions.",
//       });
//     });
// };

exports.Upcoming = (req, res) => {
  let today = new Date(Date.now()).toISOString(); // getting current date
  var condition = {
    startDate: { [Op.gte]: today },
  };

  Question.findAll({
    where: condition,
    attributes: ["startDate"],
    distinct: true,
    order: [["startDate", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving upcoming questions.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
