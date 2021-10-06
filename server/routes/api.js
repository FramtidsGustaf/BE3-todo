const express = require("express");
const {
  getAllTodos,
  addTodo,
  deleteTodo,
  editTodo,
} = require("../controllers/api");
const { verify } = require("../utils/jwt-verify");
const router = express.Router();

router.get("/", verify, getAllTodos);

router.post("/", verify, addTodo);

router.put("/", verify, editTodo);

router.delete("/", verify, deleteTodo);

module.exports = router;
