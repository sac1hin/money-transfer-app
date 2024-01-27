const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/paytm')
const connectionString = process.env.MONGODB;

mongoose.connect(connectionString)
    .then(() => console.log('Connected!'));

module.exports = mongoose;