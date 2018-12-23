const router = require('express').Router();
const key = require('../config/keys');
const user = require('../models/userModel');
var spawn = require("child_process").spawn;
//const octokit = require('../util/octokit');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true });
mongoose.connection
    .once('open',()=>console.log('CONNECTED!'))
    .on('error',(err)=>{
        console.log("COuld not connect as ",err)
    });


router.get('/:username', (req, res) => {
  var name = req.params.username;
  //console.log(name)

  user.find({"login":name})
    .then(function(err,user){
      if(err){
        res.redirect("/error");
        return;
      }
      else{
    
    var process = spawn('python',["./graphGen.py", 
                            req.params.username]); 
    process.stdout.on('data', function(data) { 
        console.log(data.toString()); 
    });
    res.render('dashboard.ejs', {Name: user[0].login, Bio: user[0].bio, Year: user[0].year, Link : user[0].avatar_url })
  }})
//             .catch(error => {
//     debugger
//     console.log(error);
//     next(error);
// });
  
// .catch(error => {
//     console.log(error);
//     next(error);
// });

});

module.exports = router;
