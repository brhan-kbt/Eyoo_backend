module.exports = (sequelize, Sequelize) => {
  const Content = sequelize.define("content", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    daily_quote: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    main_image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    video_link_1: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    video_link_2: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });

  return Content;
};
