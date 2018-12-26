const express = require('express');
const User = require('../models/userModel');

let firstYear=[], secondYear=[], thirdYear=[], fourthYear=[];

const router = express.Router();

User.find({"year":"FirstYear"}).then(users=> {
        firstYear.push(users);
});

User.find({"year":"SecondYear"}).then(users=> {
  if(!users) 
        res.redirect('/error');
  else{
        secondYear.push(users);
}});
User.find({"year":"ThirdYear"}).then(users=> {
  if(!users) 
        res.redirect('/error');
  else{
        thirdYear.push(users);
}});
User.find({"year":"FourthYear"}).then(users=> {
  if(!users) 
      res.redirect('/error');
  else{
        fourthYear.push(users);
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