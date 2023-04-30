const db = require("../models");
const Ideas = db.ideas;
const Subscriber = db.subscribers;
const Op = db.Sequelize.Op;

/* create and save new subscribers */
exports.create = (req, res) => {
  console.log(req.body);
  const Idea = {
    name: req.body.name,
    email: req.body.email,
    ideas: req.body.idea,
    date: new Date(Date.now()).toISOString(), // Automatically assigned
  };

  const subscriber = {
    name: req.body.name,
    email: req.body.email,
  };

  var condition = {
    email: { [Op.eq]: subscriber.email }
  };

  Ideas.create(Idea)
    .then(() => {
      Subscriber.count({
        where: condition,
      }).then((data)=>{
        if(data==0)
        Subscriber.create(subscriber);
      })
      res.status(200).send({
        message: "idea_submitted",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
};

// Retrieve all Ideas from the database.
exports.findAll = (req, res) => {
  Ideas.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Ideas.",
      });
    });
};
