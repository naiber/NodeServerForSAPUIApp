var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/',function(req, res,next)
{
    Book.find({},function (err ,books) {
        if (err) return res.status(500).json({error: err});
        res.setHeader("Content-Security-Policy", "frame-ancestors https://academy-test.ferrari.com/*");//Content-Security-Policy: frame-ancestors https://example.com
        res.json(books);
    })
})

router.get('/:id',function(req, res,next)
{
    Book.find({_id:req.params.id},function (err ,books) {

        if (err) return res.status(500).json({error: err});
        res.status(200).json(books);
    })
});

router.put('/:id', function (req, res,next) {
     Book.findOne({_id: req.params.id}, function (err ,books) {

            if (err) return res.status(500).json({error: err});

            if(!books) return res.status(404).json({message:'post non trovato'});

            for(key in req.body){//for Hash : cicla i campi nel body della request
                books[key] = req.body[key];
            }

            books.save(function(err)
            {
                if (err) return res.status(500).json({error: err});
                res.json(books);
            })
        }

    );
});

router.post('/',function(req,res,next)
    {
        var newBookData;
        if(!req.body.length){
            newBookData = new Book(req.body);

            newBookData.save(function(err)
            {
                if (err) return res.status(500).json({error: err});
                res.status(201).json({message : 'Libro salvato'});
            })
        }else{
            for(var bookItem in req.body){
                newBookData = new Book(req.body[bookItem]);
                newBookData.save(function(err){
                    if (err) return res.status(500).json({error: err});
                    console.log('item inserted');
                })
            }
            res.status(201).json({message : 'Libro salvato'});
        }
    }

);

router.delete('/:id',function (req, res,next)
    {
        Book.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Libro eliminato correttamente'})
        })
    }
);

module.exports = router;
