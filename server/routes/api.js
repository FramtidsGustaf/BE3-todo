const express = require('express');
const { getListsByUserId } = require('../controllers/api');


const router = express.Router();

router.get('/', getListsByUserId);

module.exports = router;