// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'node_user',
//     database: 'node-complete',
//     password: 'node_user1@#'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequlize = new Sequelize('node-complete', 'node_user', 'node_user1@#', {dialect: 'mysql', host: 'localhost'});

module.exports = sequlize;