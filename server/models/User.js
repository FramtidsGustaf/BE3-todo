const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  todoLists: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

module.exports = mongoose.model('User', UserSchema);