module.exports = (sequelize, Sequelize) => {
  const Questions = sequelize.define("questions", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "question is required" },
      },
      trim: true,
    },
    choice_a: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    choice_b: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    choice_c: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    choice_d: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    answer: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "the question must have answer" },
      },
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "the question must have answer" },
      },
    },

    endDate: {
        type: Sequelize.DATE,
        
        allowNull: false,
        validate: {
            notNull: { msg: "the question must have answer" },
          },
    },

    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  });

  return Questions;
};
