const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Db Connected');
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
    });
}

module.exports = connectToDb;