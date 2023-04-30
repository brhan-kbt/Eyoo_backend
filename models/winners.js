module.exports = (sequelize, Sequelize) => {
  const Winners = sequelize.define("winners", {
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
        notNull: { msg: "name is required!" },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "phone number is required!" },
      },
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cardBirr: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "card Birr is required!" },
      },
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return Winners;
};
