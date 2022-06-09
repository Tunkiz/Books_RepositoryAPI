var sql = require('./db.js');

const Author = function(author){
    this.author_Id = author.author_Id;
    this.author_name = author.author_name;
}

Author.create = (newAuthor, result)=>{
    sql.query('INSERT INTO authors SET?',newAuthor,(err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Create Book: ",{author_Id: res.insertId, ...newAuthor});
        result(null, {author_Id: res.insertId, ...newAuthor})
    });
};

Author.getAll = (author_name, result) =>{
    var mysql = "SELECT * FROM authors";
    if(author_name){
        mysql += `WHERE author_name LIKE ${author_name}?`;
    }
    sql.query(mysql, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Authors", res);
        result(null, res);
    });
};

Author.updateById = (author_Id,author, result)=>{
    sql.query('UPDATE authors SET author_name =? WHERE author_Id =?',
    [author.author_name, author_Id],
    (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "Not_Found"}, null);
            return;
        }
        console.log('updated author:',{author_Id: author_Id, ...author});
        result(null, {author_Id: author_Id, ...author});
    });
};

Author.remove = (author_Id, result) =>{
    sql.query('DELETE FROM authors WHERE author_Id =?', author_Id, (err, res)=>{
        if(err){
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: 'Not_Found'}, null);
            return;
        }
        console.log(`Author with id ${author_Id} deleted`);
        result(null, res);
    });
};
Author.findById =(author_Id, result)=>{
    sql.query(`SELECT * FROM authors WHERE Author_Id = '${author_Id}'`, (err, res)=>{
        if(err){
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log('Found Book: ', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'});
    });
};

module.exports = Author;