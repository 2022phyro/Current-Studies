const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
initializeConnection = () => {
  const config = {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  };
  /* create a connection object using createConnection function of mysql module*/
  var connection =  mysql.createConnection(config);

  return connection;
}
module.exports = initializeConnection;