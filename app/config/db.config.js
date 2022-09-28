module.exports = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DBNAME,
    dialect: "mysql",
    pool: {
      max: 1001,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };