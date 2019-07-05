var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/',function(req, res,next)
{
    Book.find({},function (err ,books) {
        if (err) return res.status(500).json({error: err});
        res.json(books);
    })
})

router.get('/:id',function(req, res,next)
{
    console.log('dentro get/:id')
    Book.find({_id:req.params.id},function (err ,books) {

        if (err) return res.status(500).json({error: err});
        res.status(200).json(books);
    })
});

router.post('/',function(req,res,next)
    {
        var newBookData;
        if(!req.body.length){
            newBookData = new Book(req.body);

            newBookData.save(function(err)
            {
                if (err) return res.status(500).json({error: err});
                res.status(201).json({message : 'data saved'});
            })
        }else{
            for(var bookItem in req.body){
                console.log('supplierItem-> ',req.body[bookItem])
                newBookData = new Book(req.body[bookItem]);
                newBookData.save(function(err){
                    if (err) return res.status(500).json({error: err});
                    console.log('item inserted');
                })
            }
            res.status(201).json({message : 'data saved'});
        }
    }

);

// router.post('/arr',function(req,res,next)
// {
//   if(req.body.length && req.body.length>1){
//   for(var i=0;i<req.body.length;i++){
//
//     }
//   }
// })

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
