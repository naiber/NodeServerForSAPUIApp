var express = require('express');
var router = express.Router();
var Supplier = require('../models/supplier');

router.get('/',function(req, res,next)
{
    Supplier.find({},function (err ,suppliers) {
        if (err) return res.status(500).json({error: err});
        res.json(suppliers);
    })
})

router.get('/:id',function(req, res,next)
{
    console.log('dentro get/:id')
    Supplier.find({_id:req.params.id},function (err ,suppliers) {

        if (err) return res.status(500).json({error: err});
        res.status(200).json(suppliers);
    })
});

router.post('/',function(req,res,next)
  {
       var newSupplierData;
       if(!req.body.length){
        newSupplierData = new Supplier(req.body);

        newSupplierData.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json({message : 'data saved'});
        })
      }else{
      for(var supplierItem in req.body){
        console.log('supplierItem-> ',req.body[supplierItem])
        newSupplierData = new Supplier(req.body[supplierItem]);
        newSupplierData.save(function(err){
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
        Supplier.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Utente eliminato correttamente'})
        })
    }
);

module.exports = router;
