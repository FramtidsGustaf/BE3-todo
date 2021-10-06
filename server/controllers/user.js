const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenSecret = process.env.SECRET_TOKEN;
const salt = 10;

const generateToken = (user) => {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "30m" });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.createUser = (req, res, next) => {
  //TODO encypt password
  const { fullName, displayName, password, email } = req.body;

  const userExists = User.exists({ email }).then((data) => {
    return data;
  });

  if (userExists) return res.sendStatus(400);
  bcrypt.hash(password, salt, (error, hash) => {
    if (error) res.status(500).json(error);
    const user = new User({
      fullName,
      displayName,
      password: hash,
      email,
    });
    user
      .save()
      .then((data) => {
        console.log(data._id);
        res.status(201).json(generateToken(data._id));
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  });
};

exports.loginUser = (req, res, next) => {
  const { password, email } = req.body;
  User.findOne({ email }).exec((err, data) => {
    if (err) return res.sendStatus(400);
  });
};
