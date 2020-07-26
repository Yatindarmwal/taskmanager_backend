`use strict`;
require('./services/database');
const express = require('express');
const app = express();
const port = 5000;

app.use(require('./routes/task_routes'));
app.listen(port, () => console.log(`Task_manager_backend listening at http://localhost:${port}`))




