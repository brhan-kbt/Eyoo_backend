const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // dialectOptions: {
  //   ssl: true
  // },
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.subscribers = require("./subscribers")(sequelize, Sequelize);
db.questions = require("./questions")(sequelize, Sequelize);
db.responders = require("./responders.js")(sequelize, Sequelize);
db.winners = require("./winners")(sequelize, Sequelize);
db.ideas = require("./ideas")(sequelize, Sequelize);
db.content = require("./contents")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);

module.exports = db;
