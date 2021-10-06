const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
}

exports.createUser = (req, res, next) => {
  //TODO encrypt password
  const { fullName, displayName, password, email } = req.body

  const user = new User({
    fullName,
    displayName,
    password,
    email
  });

  user.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
}