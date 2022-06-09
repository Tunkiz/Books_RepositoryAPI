const sql = require("./db.js");

//constructor
const Book = function(book){
this.title = book.title;
this.genre_Id = book.genre_Id;
this.author_Id = book.author_Id;
this.published_year = book.published_year
};

Book.create =(newBook, result) =>{
    sql.query('INSERT INTO books SET?', newBook,(err,res)=>{
        if(err){
            console.log('error: ', err);
            result(null,err);
            return;
        }
        console.log("Create Book: ",{id: res.insertId, ...newBook});
        result(null, {id: res.insertId, ...newBook}); 
    });
};
Book.getAll =(title, result)=>{
    let query = 'SELECT * FROM books';
    if(title){
        query+= `WHERE title LIKE '%${title}'`;
    }
    sql.query(query,(err, res)=>{
        if(err){
            console.log("error: ",err);
            result(null, err);
            return;
        }
        console.log("books", res);
        result(null, res);
    });
};
Book.updateById = (id, book,result) =>{
    sql.query(
        'UPDATE books SET title =?, genre_Id =?, author_Id = ?, published_year =? WHERE id = ?',
        [book.title, book.genre_Id, book.author_Id, book.published_year, id],
        (err, res) =>{
            if(err){
                console.log('error: ', err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({kind: "not_found"},null);
                return;
            }
            console.log('updated book:',{id: id, ...book});
            result(null, {id: id, ...book});
        }
    );
};

Book.remove = (id, result)=>{
    sql.query('DELETE FROM books WHERE id =?', id, (err, res)=>{
        if(err){
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: 'not_found'}, null);
            return;
        }
        console.log('delete book with id: ', id);
        result(null, res);
    });
};
Book.findById =(id, result)=>{
    sql.query(`SELECT * FROM books WHERE id = ${id}`, (err, res)=>{
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
}
module.exports = Book;


