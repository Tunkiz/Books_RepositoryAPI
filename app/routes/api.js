module.exports = app =>{
    const books = require("../controllers/book.controller");
    const Authors = require("../controllers/author.controller");
    const Genres = require('../controllers/genre_controller');
    const All = require('../controllers/all.controller');
    var router = require("express").Router();
    //For books
    router.post('/addBook', books.create);
    router.get('/getBooks/',books.findAll);
    router.get('/getBook/:id', books.findOne);
    router.delete('/delBook/:id', books.delete);
    router.put('/upBook/:id', books.update);

    //for authors
    router.post('/addAuthor', Authors.create);
    router.get('/getAuthors/',Authors.findAll);
    router.get('/getAuthor/:id', Authors.findById);
    router.delete('/delAuthor/:id', Authors.delete);
    router.put('/upAuthor/:id', Authors.updateById);
    
    //For genres
    router.post('/addGenre', Genres.create);
    router.get('/getGenres/', Genres.findAll);
    router.get('/getGenre/:id', Genres.findOne);
    router.delete('/delGenre/:id', Genres.delete);
    router.put('/upGenre/:id', Genres.update);

    router.get('/getAll', All.findAll);
    
    app.use('/api/directory', router);
}