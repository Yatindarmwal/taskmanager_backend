'use strict';

const express = require('express');
const router = express.Router();
const task_services = require('../services/task_services');

router.get('/task', async (req, res) => {
    try {
        let { query } = req;
        let tasks = await task_services.getTasks(query);
        res.send(tasks);
    } catch (err) {
        res.status(500).send('Failed to get Data');
        console.log(err);
    }
});


// router.post('/task', async (req, res) => {
//     try {
//         res.send('working');
//     } catch (err) {
//         res.status(500).send('Failed to get Data');
//         console.log(err);
//     }
// });

module.exports = router;