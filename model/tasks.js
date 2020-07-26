`use strict`;

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TaskSchema = new schema({
    user_id: String,
    task: String,
    due_date: Number,
    status: String
});

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;