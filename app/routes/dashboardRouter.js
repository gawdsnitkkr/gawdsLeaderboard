const router = require('express').Router();
const key = require('../config/keys');
const user = require('../models/userModel');
var spawn = require("child_process").spawn;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true });
mongoose.connection
    .once('open',()=>console.log('CONNECTED!'))
    .on('error',(err)=>{
        console.log("COuld not connect as ",err)
    });


router.get('/:username', (req, res) => {
  var name = req.params.username;

  user.findOne({"login":name}).then(user=>{
    if(!user){
      res.redirect('/error')
    }
    else{
        var process = spawn('python',["./graphGen.py", 
                            req.params.username]); 
    process.stdout.on('data', function(data) { 
        console.log(data.toString()); 
    });
    res.render('dashboard.ejs', {Name: user.login, Bio: user.bio, Year: user.year, Link : user.avatar_url })
  }})
    })



module.exports = router;
