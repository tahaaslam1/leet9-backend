const dotenv = require("dotenv");

dotenv.config({ path: require("find-config")(".env") });

module.exports = {
  DB_URI: process.env.DB_URI,
};
