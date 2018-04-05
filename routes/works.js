var express = require('express');
var router = express.Router();
var Work = require('../models/work');

router.get('/',function(req, res,next)
{
    Work.find({},function (err ,works) {
        if (err) return res.status(500).json({error: err});
        res.json(works);
    })
})

router.get('/:id',function(req, res,next)
{
    Work.find({_id:req.params.id},function (err ,works) {

        if (err) return res.status(500).json({error: err});
        res.json(200,works);

    })
});

router.post('/',function(req,res,next)
    {
        var newWorkData;
        if(!req.body.length){
        newWorkData = new Work(req.body);

        newWorkData.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json({message : 'data saved'});
        })
      }else{
        for(var workItem in req.body){
          console.log('workItem-> ',req.body[workItem])
          newWorkData = new Work(req.body[workItem]);
          newWorkData.save(function(err){
              if (err) return res.status(500).json({error: err});
              console.log('item inserted');
            })
          }
          res.status(201).json({message : 'data saved'});
      }
    }
);

router.delete('/:id',function (req, res,next)
    {
        Work.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Utente eliminato correttamente'})
        })
    }
);

module.exports = router;
