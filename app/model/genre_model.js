var sql = require('./db.js');

var Genre = function(genre){
    this.genre_name = genre.genre_name;
    this.genre_Id = genre.genre_Id;
}

Genre.create = (newGenre, result)=>{
    sql.query('INSERT INTO genres SET?', newGenre, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Genre Created successfully", {genre_Id: res.insertId, ...newGenre});
        result(null,{genre_Id:res.insertId, ...newGenre});
    });
};

Genre.getAll =(genre_name, result)=>{
    const mysql = "SELECT * FROM genres";
    if(genre_name){
        mysql += `WHERE genre_name LIKE ${genre_name}`;
    }
    sql.query(mysql,(err, res)=>{
        if(err){
            console.log('Error', err);
            result(null, err);
            return;
        }
        console.log("Genres: ", res);
        result(null, res);
    });
};


Genre.findById = (genre_Id, result) =>{
    
    sql.query(`SELECT * FROM genres WHERE genre_Id = '${genre_Id}'`, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("Found Genre: ", res[0])
            result(null, res[0]);
            return;
        }       
        result({kind: "not_found "});
    });
};

Genre.updateById = (genre_Id, genre, result)=>{
    sql.query(`UPDATE genres SET genre_name = ? WHERE genre_Id =?`,
    [genre.genre_name, genre_Id],
    (err, res)=>{
        if(err){
            console.log("Error", err);
            result(null, err);
            return;
        }     
        if(res.affectedRows == 0){
            result({kind : "Not found with id "}, null);
            return;
        }
        console.log("Genre updated",{genre_Id: genre_Id, ...genre});
        result(null, {genre_Id: genre_Id, ...genre});  
    });
};
Genre.remove = (genre_Id, result) =>{
    sql.query(`DELETE FROM genres WHERE genre_Id =?`, genre_Id, (err, res)=>{
        if(err){
            console.log("Error: ",err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:"not_found"});
            return;
        }
        console.log('Genre successfully deleted genre with id', genre_Id);
        result(null, res);
    });
}
module.exports = Genre;