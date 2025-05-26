require('dotenv').config();
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const app = express();

const router = require('./router/auth.router');
const connectDb = require('./utils/db')


const port = process.env.PORT;

var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}

app.use(cors(corsOptions))

app.use(express.json());
app.use('/api/auth', router)




connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
})