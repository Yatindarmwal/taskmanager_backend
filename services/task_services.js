`use strict`;

const User = require('../model/user');
const Task = require('../model/tasks');

async function getTasks(query) {
    try {
        let aggregate_query = _buildAggregation(query);
        let data = await Task.aggregate(aggregate_query);
        return data;
    } catch (err) { throw err }
}

function _buildAggregation(query) {
    try {
        let aggregate_query = [];
        if (!query) throw 'invalid request';
        if (!query.user_id) throw 'invalid request';
        aggregate_query.push({ $match: { user_id: query.user_id } });
        if (query.filter) aggregate_query.push({ $match: { status: query.filter } });
        if (query.sort_by) aggregate_query.push({ $sort: { [query.sort_by]: parseInt(query.sort_order ? query.sort_order : 1) } });
        if (query.offset) aggregate_query.push({ $skip: parseInt(query.offset) });
        if (query.limit) aggregate_query.push({ $limit: parseInt(query.limit) });
        return aggregate_query;
    } catch (err) { throw err }
}

module.exports = {
    getTasks
}

// // joe.save().then(() => {
// //     console.log('save successfully');
// // });

// .then((data) => {
//     console.log(data)
// });


// [
//         { $match: {} },
//         { $sort: { task: -1 } }
//         // { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
//     ]