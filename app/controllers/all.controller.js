var Genre = require('../model/all_model');
var {} = require('express');

exports.findAll = (req, res) =>{
    Genre.getAll((err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some errors occured while retrieving genres."
            });
        res.send(data);
    });
}