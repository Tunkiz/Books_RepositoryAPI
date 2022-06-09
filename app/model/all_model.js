var express = require('express');
var sql = require('./db.js');
class All {
    static getAll(result) {
        var mysql = `SELECT a.author_name, b.title, g.genre_name
        FROM books AS b
        LEFT JOIN genres as g
        ON g.genre_Id = b.genre_Id
        LEFT JOIN authors as a
        ON a.author_Id = b.author_Id;`;
        sql.query(mysql, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            console.log("All", res);
            result(null, res);
        });
    }
}


module.exports = All;