require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.SERVER,
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    encrypt: false,
  },
};

module.exports = {
  config,
};
