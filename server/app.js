const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.json());

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', apiRouter);
app.use('/user', userRouter);

module.exports = app;

app.listen(3000);

