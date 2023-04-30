module.exports = (sequelize, Sequelize) => {
  const Ideas = sequelize.define("ideas", {
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
      allowNull: false,
      validate: {
        notNull: { msg: "email is required!" },
      },
    },
    ideas: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "idea is required!" },
      },
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "date is required!" },
      },
    },
  });

  return Ideas;
};
