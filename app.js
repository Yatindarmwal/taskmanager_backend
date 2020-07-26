`use strict`;
require('./services/database');
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors());

const port = 5000;

app.use(require('./routes/task_routes'));
app.listen(port, () => console.log(`Task_manager_backend listening at http://localhost:${port}`))




