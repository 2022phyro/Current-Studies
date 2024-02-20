const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
initializeConnection = () => {
  /* create a connection object using createConnection function of mysql module*/
  const connection =  mysql.createConnection(dbConfig);

  return connection;
}
module.exports = initializeConnection;