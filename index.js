require('dotenv').config();
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const app = express();

const router = require('./router/auth.router');
const connectDb = require('./utils/db')


const port = process.env.PORT;

app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use('/api/auth', router)




connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
})

module.exports = app;