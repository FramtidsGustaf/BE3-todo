const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function (next, done) {
  bcrypt.hash(this.password, +process.env.SALT_ROUNDS, (err, hash) => {
    if (err) {
      next(err);
    }
    this.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema);