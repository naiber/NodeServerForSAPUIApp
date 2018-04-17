var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');


router.post('/login',function(req,res,next) {
    console.log('req.body',req.body)
    User.find({user:req.body.username},function(err,users){
        if (err) return res.status(500).json({error: err});
        res.json(201,users)
    })
})

router.get('/:user/:menu',function(req,res,next){
    User.findOne({user : req.params.user},function(err,myUser){
                        if(err) res.status(500).json({error : err})

                        if(!myUser.entries[req.params.menu]){
                            res.status(404).json({error : "no data"})
                        }else{
                            res.status(200).json(myUser.entries[req.params.menu])
                        }
                })
})


router.get('/',function(req, res,next) {
    User.find({},function (err ,users) {
        if (err) return res.status(500).json({error: err});
        res.json(users);
    })
})

router.get('/:id',function(req, res,next) {
    User.find({_id:req.params.id},function (err ,users) {
        if (err) return res.status(500).json({error: err});
        res.json(200,users);

    })
});
router.post('/logon',function(req,res,next) {
  if (req.body) {
  User.findOne({user : req.body.username},function(err,user){
      if(err) res.status(500).json({error : err})
      if(!user){
          res.status(404).json({message : 'user not found'})
      }else if(bcrypt.compareSync(req.body.password,user.password)){
        var token = jwt.encode(user._id, secret);
        console.log(token);
        return res.status(200).json({
                                        'user' : user,
                                        'token' : token
                                    });
      }

  })
  
}else{
  console.log('error if condition')
  res.status(404).json({message : 'no body received'});
}
})

var authorize = function(req, res, next) {
    if (req.query.token === undefined) return res.status(401).json({message:'Unothorized'})
    var id = jwt.decode(req.query.token, secret);
    User.findById(id, function(err, user) {
        if (err) return res.status(500).json({message: err});
        req.user = user;
        next();
    })
}

router.post('/',function(req,res,next) {
    var salt = bcrypt.genSaltSync(10);
        var newUser = new User({
            name : req.body.name,
            user : req.body.user,
            password : bcrypt.hashSync(req.body.password,salt),
            entries : req.body.entries
        });

        newUser.save(function(err,user)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(user);
        })

    }
);

router.put('/:id', function (req, res,next) {
        User.findOne({_id: req.params.id}, function (err ,users) {

                if (err) return res.status(500).json({error: err});

                if(!users) return res.status(404).json({message:'post non trovato'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    users[key] = req.body[key];
                }

                users.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(users);
                })
            }

        )
    }
);

router.delete('/:id',function (req, res,next) {
        User.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Utente eliminato correttamente'})
        })
    }
);


module.exports = router;
