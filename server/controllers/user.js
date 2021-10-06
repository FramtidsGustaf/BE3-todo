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

exports.createUser = async (req, res, next) => {
  //TODO encypt password
  const { fullName, displayName, password, email } = req.body;

  const userExists = await User.exists({ email });
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
        res.status(201).json({ token: generateToken(data._id) });
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
    console.log(data);
    bcrypt.compare(password, data.password, (error, match) => {
      if (error) res.status(500).json(error);
      else if (match) res.status(200).json({ token: generateToken(data._id) });
      else res.status(403).json({ msg: "Wrong email or password" });
    });
  });
};
