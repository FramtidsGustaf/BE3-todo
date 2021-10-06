const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRouter = require('./routes/api');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000);
