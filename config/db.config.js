module.exports = {
  HOST: process.env.LOCAL_HOST,
  USER: process.env.LOCAL_DBUSER,
  PASSWORD: process.env.LOCAL_DBPASSWORD,
  DB: process.env.LOCAL_DB,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
