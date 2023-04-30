// Import the built-in data types
// const DataTypes = require("@sequelize/core");

module.exports = (sequelize, Sequelize) => {
  const Responder = sequelize.define("responders", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "responder name is required" },
      },
      trim: true,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "phone number is required" },
      },
      trim: true,
    },
    question_1: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "question 1 validation failed" },
      },
    },
    question_2: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "question 2 validation failed" },
      },
    },
    question_3: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "question 3 validation failed" },
      },
    },
    question_4: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "question 4 validation failed" },
      },
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "total score is required" },
      },
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return Responder;
};
