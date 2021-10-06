const express = require("express");

const { getAllUsers, createUser, loginUser } = require("../controllers/user");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.post("/login", loginUser);

module.exports = router;
