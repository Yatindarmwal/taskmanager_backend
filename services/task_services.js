`use strict`;

const User = require('../model/user');
const Task = require('../model/tasks');

async function getTasks(query) {
    try {
        let count_query = Object.assign({}, query);
        let aggregate_query = _buildAggregation(query);
        let aggregate_count_query = _buildAggregation(count_query, true);
        let data = await Promise.all([Task.aggregate(aggregate_query), Task.aggregate(aggregate_count_query)]);
        let [task_list, count] = data;
        return { count: count[0].id, task_list };
    } catch (err) { throw err }
}

function _buildAggregation(query, count = false) {
    try {
        let aggregate_query = [];
        if (!query) throw 'invalid request';
        if (!query.user_id) throw 'invalid request';
        aggregate_query.push({ $match: { user_id: query.user_id } });
        query.filter = (query.filter.length && query.filter != 'null') ? JSON.parse(query.filter) : [];
        query.filter = query.filter.map((filter) => {
            return {
                status: filter
            }
        });
        if (query.filter.length) aggregate_query.push({ $match: { $or: query.filter } });
        if (query.sort_by) aggregate_query.push({ $sort: { [query.sort_by]: parseInt(query.sort_order == 'descend' ? -1 : 1) } });
        if (!count) {
            if (query.offset) aggregate_query.push({ $skip: parseInt(query.offset) });
            if (query.limit) aggregate_query.push({ $limit: parseInt(query.limit) });
        }
        if (count) aggregate_query.push({ $count: "id" });
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