const Author = require('../model/author_model');
const {} = require('express');
exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const author = new Author({
        author_name: req.body.author_name,
        genre: req.body.genre,
        genre_Id: req.body.genre
        });
        Author.create(author, (err,data)=>{
            if(err)
                res.status(400).send({
                   message: "Some errors ocurred while creating a author."
                });
            else res.send(data);
        });
}

exports.findAll =(req, res)=>{
    var author_name = req.query.author_name;
    Author.getAll(author_name, (err, data)=>{
        if(err)
            res.status(500).send({
                message: "Some errors occured while retrieving authors"
            });
        else res.send(data);
    });
}

exports.findById = (req, res)=>{
    const id = req.params.id;
    Author.findById(id, (err, data)=>{
        if(err){
            if(err.kind === "not_found")
                res.status(404).send({
                    message: "Id not found"
                });
            else
                res.status(500).send({
                    message: "Some errors ocuured while retrieving author with id "+id
                });
        }
        else res.send(data);
    });
}
exports.updateById = (req, res)=>{
    if(!req.body)
        res.status(400).send({
            message: "Content can not be empty"
        });
    const id = req.params.id;
    Author.updateById(id, req.body, (err, data)=>{
        if(err)
            if(err.kind === "not_found")
                res.status(404).send({
                    message: "Id not found"
                });
            else
                res.status(500).send({
                    message: "Error updating author with id "+id
                });
        else res.send(data);
    });
}

exports.delete = (req, res)=>{
    id = req.params.id;
    Author.remove(id, (err, data)=>{
        if(err)
            if(err.kind === "not_found")
                res.status(404).status({
                    message: "Id not found"
                });
            else
                res.status(500).status({
                    message: "Error deleting author with id "+id
                });
        else res.send({message: "Author was deleted successfully"});
    })
}