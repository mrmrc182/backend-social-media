const { connect, connection } = require('mongoose');

connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  module.exports = connection;
  