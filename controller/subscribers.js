const db = require("../models");
const Subscriber = db.subscribers;

/* create and save new subscribers */
exports.create = (req, res) => {
  const subscriber = {
    name: req.body.name ? req.body.name : null,
    email: req.body.email,
  };

  Subscriber.create(subscriber)
    .then(() => {
      res.status(200).send({
        message: "successfully subscribed",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
};

// Retrieve all Subscribers from the database.
exports.findAll = (req, res) => {
  Subscriber.findAll()
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
