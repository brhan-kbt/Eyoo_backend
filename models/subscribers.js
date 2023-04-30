module.exports = (sequelize, Sequelize) => {
  const Subscribers = sequelize.define("subscriber", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      require: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: "Already Subscribed!",
      },
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return Subscribers;
};
