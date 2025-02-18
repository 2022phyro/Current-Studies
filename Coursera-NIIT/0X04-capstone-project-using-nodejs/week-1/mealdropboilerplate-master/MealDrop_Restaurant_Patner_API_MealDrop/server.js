const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
const { connect } = require('./config/database');

connect();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App stated at port ${port}`);
});

module.exports = app;
