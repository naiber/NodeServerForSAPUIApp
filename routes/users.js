var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();
// var app = express();
var User = require('../models/user');
/*app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())*/
/* GET users listing. */

/*router.post('/login',function (req,res) {
    var username = req.body.user;
    var password = req.body.password;
    console.log("Username = "+username+" , password = "+password);
    res.end("yes")
})*/

var middle= function(req, res, next) {
    if(req.query.t && req.query.t==="admin") {
        next()
    }
    else{
        res.status(401).json({status:"Token not valid"});
    }
};

var validateLogin = function(req,res,next){
    if(req.body){
        next()
    }else{
        res.status(401).json({status:"Token not valid"});
    }
}

router.get('/l',function (req,res,next) {

    /*res.json({
        status:"success"
    })*/
})

router.post('/login',validateLogin,function(req,res,next){
    console.log('req.body',req.body)
    User.find({user:req.body.username},function(err,users){
        if (err) return res.status(500).json({error: err});
        res.json(201,users)
    })
})

router.get('/',function(req, res,next)
{
    User.find({},function (err ,users) {
        if (err) return res.status(500).json({error: err});
        res.json(users);
    })
})

router.get('/:id',function(req, res,next)
{
    User.find({_id:req.params.id},function (err ,users) {

        if (err) return res.status(500).json({error: err});
        res.json(200,users);

    })
});

router.post('/',function(req,res,next)
    {
        var newUser = new User(req.body);

        newUser.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newUser);
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

router.delete('/:id',function (req, res,next)
    {
        User.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Utente eliminato correttamente'})
        })
    }
);


module.exports = router;
