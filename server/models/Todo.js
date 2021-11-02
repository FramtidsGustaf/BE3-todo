const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      todos: {
        type: String,
        required: true,
      },
    },
    {timestamps: true},
);

module.exports = mongoose.model('Todo', TodoSchema);
