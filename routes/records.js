var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');
var Record = require('../models/record');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

router.get('/:user/:menu',function(req,res,next){
    Record.find({user:req.params.user,menu:req.params.menu},function(err,records){
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

    newAppointment.save(function(err,user)
    {
        if (err) return res.status(500).json({error: err});
        res.status(201).json(user);
    })
})

router.delete('/record/:user/:menu/:id',function(req,res,next){
    User.findOne({user:req.params.user},function(err,myUser){
        if(err) res.status(500).json({error : err})

        if(!myUser.entries[req.params.menu]){
            res.status(404).json({error : "no data"})
        }else{
            for(var record of myUser.entries[req.params.menu].appointment){
                console.log('\nrecord-> ',record)
                if(record._id==req.params.id){
                    myUser.entries[req.params.menu].appointment.remove(record);
                    myUser.save(function(err,user)
                    {
                        if (err) return res.status(500).json({error: err});
                        res.status(201).json(user);
                    })
                }            
            }

            res.status(404).json({error : "no data"})
        }
    })
})

router.put('/record/:user/:menu/:id',function(req,res,next){
    var i = 0;
    User.findOne({user:req.params.user},function(err,myUser){
        if(err) res.status(500).json({error : err})

        if(!myUser.entries[req.params.menu]){
            res.status(404).json({error : "no data"})
        }else{
            for(var record of myUser.entries[req.params.menu].appointment){
                i++;
                console.log('\nrecord-> ',record)
                if(record._id==req.params.id){
                    myUser.entries[req.params.menu].appointment[i]=req.body;
                    myUser.save(function(err,user)
                    {
                        if (err) return res.status(500).json({error: err});
                        res.status(201).json(user);
                    })
                }
            }

            res.status(404).json({error : "no data"})
        }
    })
})


module.exports = router;