const express = require('express');
const User = require('../models/userModel');

let firstYear=[], secondYear=[], thirdYear=[], fourthYear=[];

const router = express.Router();

User.find({"year":"FirstYear"}).then(users=> {
  if(!users) 
  res.redirect('/error');
  else{
      for(var i=0;i<users.length;i++){
        firstYear.push(users[i])
      }
      console.log(firstYear.login)
}});

User.find({"year":"SecondYear"}).then(users=> {
  if(!users) 
  res.redirect('/error');
  else{
      for(var i=0;i<users.length;i++){
        secondYear.push(users[i])
      }
}});
User.find({"year":"ThirdYear"}).then(users=> {
  if(!users) 
  res.redirect('/error');
  else{
      for(var i=0;i<users.length;i++){
        thirdYear.push(users[i])
      }
}});
User.find({"year":"FourthYear"}).then(users=> {
  if(!users) 
  res.redirect('/error');
  else{
      for(var i=0;i<users.length;i++){
        fourthYear.push(users[i])
      }
}});
router.get('/', (req, res) => {
  res.render('members.ejs', {
    yearOne: firstYear,
    yearTwo: secondYear,
    yearThree: thirdYear,
    yearFour: fourthYear,
    counter: [1,1,1,1]
  })

});

module.exports = router;