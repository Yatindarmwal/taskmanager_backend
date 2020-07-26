`use strict`;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/task_manager');
mongoose.connection
    .once('open', () => console.log('Database connected!!'))
    .on('error', (error) => {
        console.warn('Error', error);
    });