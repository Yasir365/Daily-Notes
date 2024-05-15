const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    deadlineDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed', 'missed'],
        default: 'pending'
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
