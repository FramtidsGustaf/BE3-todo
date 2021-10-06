const Todo = require("../models/Todo");

exports.getAllTodos = (req, res, next) => {
  Todo.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log(err));
};

exports.addTodo = (req, res, next) => {
  const { todos } = req.body;
  const newTodo = new Todo({
    todos,
    user: "615d6e870fa7007574fde44e",
  });
  newTodo
    .save()
    .then((data) => res.sendStatus(201))
    .catch((err) => res.sendStatus(400));
};

exports.deleteTodo = (req, res, next) => {
  const { id } = req.body;
  Todo.findByIdAndDelete(id)
    .then((data) => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
};
