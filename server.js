const express = require("express");
var cors = require('cors');
var app = express();

var corsOptions ={
    origin: "http://localhost:8081"
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.json({message: 'welcome'})
});

const PORT = process.env.PORT || 8081;
app.listen(8081);
require("./app/routes/api.js")(app);
require('./app/model/db');