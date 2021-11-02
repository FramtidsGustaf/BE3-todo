const Todo = require('../models/Todo');

exports.getAllTodos = (req, res, next) => {
  const id = req.user;
  Todo.find({user: id})
      .then((data) => {
        if (data.length > 0) return res.status(200).json(data);
        res.sendStatus(404);
      })
      .catch(() => res.sendStatus(400));
};

exports.getTodo = (req, res, next) => {
  const {id} = req.params;
  Todo.findById(id).exec((err, data) => {
    if (data) return res.status(200).json(data);
    res.sendStatus(404);
  });
};

exports.addTodo = (req, res, next) => {
  const {todos} = req.body;
  const id = req.user;
  console.log(id);

  const newTodo = new Todo({
    todos,
    user: id,
  });
  newTodo
      .save()
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(400));
};

exports.deleteTodo = (req, res, next) => {
  const {id} = req.body;
  Todo.findByIdAndDelete(id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(400));
};

exports.editTodo = (req, res, next) => {
  const {id, todos} = req.body;
  Todo.findByIdAndUpdate(id, {todos})
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(400));
};
