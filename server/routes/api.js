const express = require("express");
const { getAllTodos, addTodo, deleteTodo } = require("../controllers/api");
const router = express.Router();

router.get("/", getAllTodos);

router.post("/", addTodo);

router.delete("/", deleteTodo);

module.exports = router;
