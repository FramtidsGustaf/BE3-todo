const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenSecret = process.env.SECRET_TOKEN;

const generateToken = (user) => {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "30m" });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
};

exports.createUser = async (req, res, next) => {
  const { fullName, displayName, password, email } = req.body;

  const userExists = await User.exists({ email });
  if (userExists) return res.sendStatus(400);
  const user = new User({
    fullName,
    displayName,
    password,
    email,
  });
  user
    .save()
    .then((data) => {
      res.status(201).json({ token: generateToken(data._id) });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.loginUser = (req, res, next) => {
  const { password, email } = req.body;
  User.findOne({ email }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    if (!data) return res.sendStatus(404);
    bcrypt.compare(password, data.password, (error, match) => {
      if (error) res.status(500).json(error);
      else if (match) res.status(200).json({ token: generateToken(data._id) });
      else res.status(403).json({ msg: "Wrong email or password" });
    });
  });
};

exports.verifyJWT = (req, res, next) => {
  const id = req.user;
  res.status(200).json({token: generateToken(id)});
};
