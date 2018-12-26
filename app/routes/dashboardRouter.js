const router = require('express').Router();
const key = require('../config/keys');
const user = require('../models/userModel');
var spawn = require("child_process").spawn;
const mongoose = require('mongoose');
//mongodb://ratin:123qwe456rty@ds143594.mlab.com:43594/leaderboard
mongoose.connect('mongodb://ratin:123qwe456rty@ds143594.mlab.com:43594/leaderboard',{ useNewUrlParser: true });
mongoose.connection
    .once('open',()=>console.log('CONNECTED!'))
    .on('error',(err)=>{
        console.log("COuld not connect as ",err)
    });

function graphGen(username,res){
  user.findOne({"login":username}).then(async user=>{
    if(!user){
      res.redirect('/error');
    }
    else{
      const  process = await spawn('python',["./graphGen.py", username]);
      process.stdout.on('data', function(data) { 
      console.log(data.toString())})
      res.render('dashboard.ejs', {
        Name: user.login, 
        Bio: user.bio, 
        Year: user.year, 
        Link : user.avatar_url,
        Repos: user.public_repos,
        Gists: user.public_gists,
        Total: user.contributions,
        Followers: user.followers,
      })
      }
    })
  }
 
router.get('/:username', (req, res) => {
  var name = req.params.username;
  graphGen(name,res);

  // var process = spawn('python',["./deleteplots.py"]); 
  // process.stdout.on('data', function(data) { 
  // console.log(data.toString()); 
    //})
  });

module.exports = router;

