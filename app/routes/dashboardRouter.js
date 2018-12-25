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

async function graphGen(username,res){
  user.findOne({"login":username}).then(async user=>{
    if(!user){
      res.redirect('/error');
    }
    else{
      const  process = await spawn('python',["./graphGen.py", username]);
      process.stdout.on('data', function(data) { 
      console.log(data.toString())}); 
      res.render('dashboard.ejs', {Name: user.login, Bio: user.bio, Year: user.year, Link : user.avatar_url});
      console.log("rendered page")
      }
    })
  }
 
router.get('/:username', (req, res) => {
  var name = req.params.username;
  graphGen(name,res);
  
  // user.findOne({"login":name}).then(user=>{
  //       if(!user){
  //         res.redirect('/error');
  //       }
  //       else{
  //         const  process =spawn('python',["./graphGen.py", name]); 
  //         process.stdout.on('data', function(data) { 
  //         console.log(data.toString())}); 
  //       res.render('dashboard.ejs', {Name: user.login, Bio: user.bio, Year: user.year, Link : user.avatar_url })
  //         }
  //       })
 

  // var process = spawn('python',["./deleteplots.py"]); 
  // process.stdout.on('data', function(data) { 
  // console.log(data.toString()); 
    //})
  });



module.exports = router;
