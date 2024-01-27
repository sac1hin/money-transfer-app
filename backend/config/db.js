const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/paytm')
const connectionString = `mongodb+srv://sachin:sac6969@cluster0.wjmetkt.mongodb.net/paytm`;

mongoose.connect(connectionString)
    .then(() => console.log('Connected!'));

module.exports = mongoose;