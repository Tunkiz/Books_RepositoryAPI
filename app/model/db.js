//database model
const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//Creating a connection
const connection = mysql.createConnection(
    {
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    }
);

//Opening connection
connection.connect(error => {
    if(error) throw error;
    console.log('Database connection successful');
});
module.exports = connection;
