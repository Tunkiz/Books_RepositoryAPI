const Book = require('../model/book_model');
const {} = require('express');
exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }
    const book = new Book({
        title: req.body.title,
        genre: req.body.genre,
        genre_Id: req.body.genre_Id,
        author_name: req.body.author_name,
        author_Id: req.body.author_Id,
        published_year: req.body.published_year
    });
    Book.create(book, (err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Book."
            });
        else res.send(data);
    });
};

exports.findAll =(req, res)=>{
    const title = req.query.title;
    Book.getAll(title, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving some books."
            });
        }
        else res.send(data);
    });
};

exports.findOne =(req, res)=>{
    
    Book.findById(req.params.id, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                req.status(404).send({
                    message: `Not found Book with id ${req.params.id}`,
                });
            } else{
                res.status(500).send({
                    message: "Error retrieving Book with id "+req.params.id
                });
            }
        }
        else res.send(data);
    });
};
exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Book.updateById(
        req.params.id,
        new Book(req.body),
        (err, data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Not found Book with id ${req.params.id}`,
                    });
                }
                else{
                    res.status(500).send({
                        message: `Error updating Book with id`+req.params.id
                    });
                }
            }
            else res.send(data);
        });
};

exports.delete = (req, res)=>{
    Book.remove(req.params.id, (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message:`Book with id ${req.params.id} not found`,
                });
            }
            else{
                req.status(500).send({
                    message:`Coud not delete Book with id `+req.params.id
                });
            }
        }
        else res.send({message: `Book was deleted successfully`});
    });
}