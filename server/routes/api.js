const express = require("express");
const { getAllTodos, addTodo } = require("../controllers/api");
const router = express.Router();

router.get("/", getAllTodos);

router.post("/", addTodo);

module.exports = router;
