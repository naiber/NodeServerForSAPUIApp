var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');
var Record = require('../models/record');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

router.get('/:user/:menu',function(req,res,next){
    Record.find({user:req.params.user,menu:req.params.menu}).
    populate('user').
    exec(function(err,records){
        if (err || !records) res.status(500).json({error: err})

        res.status(200).json(records)
    })
})

router.post('/:user/:menu',function(req,res,next){
    
    var newAppointment = new Record({
        user : req.params.user,
        menu : req.params.menu,
        idOrder : req.body.idOrder,
        order : req.body.order,
        supplier : req.body.supplier,
        hours : req.body.hours
    })

    /* User.findOne({user:req.params.user}).
        where('entries.name').equals(req.params.menu).
        select('entries').
        exec(function(err,entry){
            
        }) */
    

    newAppointment.save(function(err,record)
    {
        if (err) return res.status(500).json({error: err});
        res.status(200).json(record);
    })
})

router.delete('/:user/:menu/:id',function(req,res,next){
    Record.remove({user:req.params.user,menu:req.params.menu,_id:req.params.id},function(err){
        if(err) res.status(500).json({error : err})

        res.status(200).json({message : 'record deleted'});
    })
})

router.put('/:user/:menu/:id',function(req,res,next){

    var newAppointment = new Record(req.body);
    Record.findOne({user:req.params.user,menu:req.params.menu,_id:req.params.id}).
        populate('user').
        exec(function(err,record){
            if(err) res.status(500).json({error : err})

            record = newAppointment;
            record.save(function(err){
                if(err) res.status(500).json({error : err})
                
                res.status(201).json({message : 'record updated'})
            })
        })
})


module.exports = router;