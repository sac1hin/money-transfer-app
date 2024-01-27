const express = require("express");
const cors = require('cors')
require('dotenv').config();
require('./config/db');

const app = express();
const PORT = process.env.PORT

app.use(cors('*'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/v1', require('./routes'));

app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).json('Internal Server Error');
    }
    next(err);
});


app.listen(PORT, (e) => {
    if (e) {
        console.log(`Server failed to start at PORT:`, PORT);
    }
    console.log(`Server started at PORT:`, PORT);
})

module.exports = app;