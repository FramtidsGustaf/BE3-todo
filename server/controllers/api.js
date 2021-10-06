const Todo = require("../models/Todo");

exports.getAllTodos = (req, res, next) => {
  Todo.find()
    .then((data) => {
      if (data.length > 1) return res.status(200).json(data);
      res.sendStatus(404);
    })
    .catch(() => res.sendStatus(400));
};

exports.addTodo = (req, res, next) => {
  const { todos } = req.body;

  const newTodo = new Todo({
    todos,
    user: "615d6e870fa7007574fde44e",
  });
  newTodo
    .save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(400));
};

exports.deleteTodo = (req, res, next) => {
  const { id } = req.body;
  Todo.findByIdAndDelete(id)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
};

exports.editTodo = (req, res, next) => {
  const { id, todos } = req.body;
  Todo.findByIdAndUpdate(id, { todos })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
};
