const express = require('express');
const {
  createUser,
  loginUser,
  verifyJWT,
} = require('../controllers/user');
const {verify} = require('../utils/jwt-verify');
const router = express.Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.post('/verify-jwt', verify, verifyJWT);

module.exports = router;
